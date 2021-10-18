# usage

## pour fetcher les donner et les écrire dans db.json

    make fetch

tested with deno 1.15.1 (check with `deno --version` and use `deno upgrade` to switch versions)

(attention les appels HTTP ont tous été cachés dans redis, il faut clean le cache si on veut taper à nouveau sur le site)

## pour clean le cache redis

    redis-cli KEYS "cocktailsdb*" | xargs redis-cli DEL
