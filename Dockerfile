FROM docker.io/denoland/deno:alpine
WORKDIR /app
COPY skinmeagain.js .
RUN deno cache skinmeagain.js
EXPOSE 8000
CMD ["run", "--allow-net", "skinmeagain.js"]
