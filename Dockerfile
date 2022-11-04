FROM denoland/deno:1.25.1

# The port that your application listens to.
EXPOSE 1993

WORKDIR /app

ADD . .

RUN deno task cache

CMD ["task", "start"]