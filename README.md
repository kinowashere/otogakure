# otogakure

music stats

gangster-driven development

## setup

- setup bun with `asdf`.
- have a mongo instance running.
- copy `.env.example` to `.env` and setup your own env vars.
- copy your spotify tracks (_Streaming History Audio_) into `./spotify_data/`

## scripts

- `bun setup` -> to create indexes and verify your setup
- `bun import_local_tracks` -> to import the json files into mongo
- `bun import_spotify_data` -> fetch all artist, album, and track data from spotify to mongo

## usage

- do the setup in the readme
- run `bun setup`
- run `bun import_local_tracks`
- run `bun import_spotify_data`
  - in case of errors regarding 500 status code, run the script again. spotify be like that sometimes.
  - in case of getting rate limits, try again tomorrow or smth.

## todo

### core features

- [x] anime girl
- [x] 0 tests
- [x] javascript

## extra features

- [ ] `import_spotify_data` option to force refetch of all spotify data even if it exists
- [ ] `import_local_tracks` dump in a file or smth the files which can't be imported

```
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡟⢁⣾⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣥⣿⣿⣿⣿⣿⡿⢿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡏⣾⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⡟⠓⠛⠿⢿⣿⣿⡇⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⠃⣦⡤⣤⡀⢹⡿⡇⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⠀⢳⡀⢀⣽⠄⡇⠀⠀⠈⠛⢛⡻⠟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣰⣿⣿⡿⠛⣿⣿⠀⠀⠉⠉⠋⠀⠃⠀⠀⠀⠰⣟⠃⠒⢶⣝⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⡴⠟⠋⠁⠀⡼⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠦⠤⠞⠃⣾⣿⣿⣿⡿⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠀⣾⠋⠀⠀⠀⠀⡸⠁⣿⣿⡆⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⣿⣿⣿⠏⢰⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀
⠀⢀⣾⡏⠀⠀⠀⠀⢀⠇⢰⣿⣿⣧⠀⠀⢀⠀⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡟⢀⡏⢀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀
⠀⣾⡧⠁⠀⠃⠀⡄⢸⠀⠘⢻⣿⣬⣆⠀⠈⠙⠳⠤⠤⠔⠀⠀⠀⠀⣀⣴⣿⣿⣿⢁⡾⠁⡜⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆
⠀⣿⣷⠀⠀⠀⠀⢰⣸⠀⢀⢸⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⣀⣠⣴⣾⣿⡿⣿⣿⣿⠼⠁⡰⠁⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿
⢰⣿⣿⠀⠀⠀⠀⠀⢿⠀⠸⠊⣿⣿⣟⣿⣿⣶⣤⣴⣾⣿⣾⣿⣿⠿⠋⣠⣿⣿⠁⢀⠞⠁⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿
⢸⣿⣟⠀⠀⢀⣀⠀⢸⡆⠀⡇⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⢁⣤⠞⠃⣿⣏⠔⠃⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿
⢸⣿⣿⣧⠀⠈⠛⠀⠀⠳⣀⣤⣼⣿⣿⣿⣿⣿⣿⣿⣿⠁⢠⡾⠋⠁⠀⣠⣿⠁⠀⠀⠀⠀⠐⠂⠀⠀⠀⠀⡔⣹⣿⣿⣿⣿⣿⣿
⢸⣿⣿⣿⣷⣤⣀⠀⠀⠀⡉⡟⢿⠉⣻⣿⢿⣿⣿⣿⠃⣰⠏⠀⠀⡠⠞⠁⠃⠀⠀⠀⢀⡤⠒⠀⠀⠀⢀⣜⣴⣿⣿⣿⣿⣿⣿⠻
⢸⣿⣿⣿⡿⠉⠙⠻⢭⣛⡳⠁⠀⣠⠟⡟⢸⡇⢸⠙⣤⣏⡠⠔⠋⠀⠀⠀⠀⠀⣠⠔⠋⠀⠀⢀⡤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
⢸⣿⣿⣿⣤⡀⠀⠀⠀⢈⣷⠀⣸⡏⢀⡇⢸⡇⢸⣾⠋⠀⠀⠀⠀⠀⠀⣀⠤⠊⠀⠀⢀⠤⣚⣵⣾⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⠀
⣿⣿⣿⣿⣿⠿⣿⣶⣴⣟⠁⠈⠀⣇⠀⠇⢸⠀⢸⣻⡷⢄⡀⠀⠉⠉⢁⣀⡀⣤⡤⣊⣵⣾⣿⣿⣿⣿⡿⡹⢹⣿⠃⢻⣿⣿⡿⠀
```
