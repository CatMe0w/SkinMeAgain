import { Hono } from "jsr:@hono/hono";
import { decodeBase64 } from "jsr:@std/encoding";

const app = new Hono();

// Mojang API
async function getUuidFromMojang(username) {
  const uuidResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  if (!uuidResponse.ok) {
    throw new Error(`Mojang API: Username not found: ${uuidResponse.statusText}`);
  }
  const uuidData = await uuidResponse.json();
  return uuidData.id;
}

async function getMetadataFromMojang(uuid) {
  const profileResponse = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
  if (!profileResponse.ok) {
    throw new Error(`Mojang sessionserver: Failed to retrieve profile: ${profileResponse.statusText}`);
  }
  const profileData = await profileResponse.json();
  const texturesBase64 = profileData.properties.find((prop) => prop.name === "textures").value;
  return JSON.parse(new TextDecoder().decode(decodeBase64(texturesBase64)));
}

// CustomSkinAPI
async function getMetadataFromCustomSkinApi(username, rootUrl) {
  const response = await fetch(`${rootUrl}/${username}.json`);
  if (!response.ok) {
    throw new Error(`CustomSkinAPI: Username not found in ${rootUrl}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getTextureFromCustomSkinApi(rootUrl, textureId) {
  const textureResponse = await fetch(`${rootUrl}/textures/${textureId}`);
  if (!textureResponse.ok) {
    throw new Error(`CustomSkinAPI: Failed to retrieve texture from ${rootUrl}: ${textureResponse.statusText}`);
  }
  return textureResponse;
}

// ElyBy API
async function getMeatdataFromElyByApi(username, rootUrl) {
  const response = await fetch(`${rootUrl}/${username}`);
  if (!response.ok) {
    throw new Error(`ElyByAPI: Failed to retrieve ${type} for ${username} from ${rootUrl}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Get skin or cape texture for a given username
async function getTexture(username, textureType) {
  let uuid = await getUuidFromMojang(username);
  if (uuid) {
    const metadata = await getMetadataFromMojang(uuid);
    if (metadata) {
      if (textureType === "skin" && metadata.textures.SKIN) {
        return await fetch(metadata.textures.SKIN.url);
      } else if (textureType === "cape" && metadata.textures.CAPE) {
        return await fetch(metadata.textures.CAPE.url);
      }
    }
  }

  // Fallback to CustomSkinAPI (LittleSkin, Blessing Skin)
  const customSkinApis = ["https://littleskin.cn/csl", "https://skin.prinzeugen.net"];

  for (const api of customSkinApis) {
    const metadata = await getMetadataFromCustomSkinApi(username, api);
    console.log(metadata);
    if (metadata) {
      let textureId = "";
      if (textureType === "skin") {
        textureId = metadata.skins.default || metadata.skins.slim;
      } else if (textureType === "cape") {
        textureId = metadata.cape;
      }
      if (textureId) {
        const textureResponse = await getTextureFromCustomSkinApi(api, textureId);
        if (textureResponse) return textureResponse;
      }
    }
  }

  // Fallback to ElyByAPI (ElyBy, TLauncher)
  const elyByApis = ["http://skinsystem.ely.by/textures", "https://auth.tlauncher.org/skin/profile/texture/login"];

  for (const api of elyByApis) {
    const metadata = await getMeatdataFromElyByApi(username, api);
    if (metadata) {
      if (textureType === "skin" && metadata.SKIN) {
        const url = metadata.SKIN.url.replace("ely.by/minecraft/", "ely.by/storage/"); // what the fuck?
        return await fetch(url);
      } else if (textureType === "cape" && metadata.CAPE) {
        const url = metadata.CAPE.url.replace("ely.by/minecraft/", "ely.by/storage/");
        return await fetch(url);
      }
    }
  }

  return null;
}

app.get("/", async (c) => {
  return c.redirect("https://github.com/CatMe0w/SkinMeAgain");
});

app.get("/*", async (c) => {
  const url = new URL(c.req.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  let textureType = "";
  let username = "";

  if (hostname === "skins.logincraft.net" && pathname.startsWith("/g.php")) {
    username = url.searchParams.get("u");
    textureType = url.searchParams.get("t");
  }

  if (hostname === "www.mcmyskin.com") {
    const base64AndUsername = pathname.slice(1).replace(".png", "");
    const decodedString = decodeURIComponent(base64AndUsername);
    const matches = decodedString.match(/.*?([a-zA-Z0-9_]+)$/);
    if (matches) {
      username = matches[1];
    }
    if (decodedString.startsWith("MDswOzE")) {
      textureType = "skin";
    }
    if (decodedString.startsWith("MDsxOzE")) {
      textureType = "cape";
    }
  }

  if (!username) {
    return c.text("Invalid username", 400);
  }

  if (textureType !== "skin" && textureType !== "cape") {
    return c.text("Invalid texture type", 400);
  }

  try {
    const textureResponse = await getTexture(username, textureType);
    if (!textureResponse) {
      return c.text("Texture not found", 404);
    }

    return c.body(textureResponse.body, 200, {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
      "X-Hello-From-SkinMeAgain": "https://github.com/CatMe0w/SkinMeAgain"
    });
  } catch (error) {
    return c.text(`An error occurred: ${error.message}`, 500);
  }
});

Deno.serve(app.fetch);
