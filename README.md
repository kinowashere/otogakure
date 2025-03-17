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
- `bun process_listened_tracks` -> denormalize spotify data into listened tracks
- `bun dev` -> to run a dev version of the frontend
- `bun server:watch` -> run a dev version of the backend
- `bun process_charts` -> process your listening history to charts.
  - by default, the script only processes charts which have not been stored / processed
  - `--all` -> use when you want to re-process all your charts

## usage

- do the setup in the readme
- run `bun setup`
- run `bun import_local_tracks`
- run `bun import_spotify_data`
  - in case of errors regarding 500 status code, run the script again. spotify be like that sometimes.
  - in case of getting rate limits, try again tomorrow or smth.
- run `bun process_listened_tracks`

## todo

### core features

- [x] anime girl
- [x] 0 tests
- [x] javascript

## extra features

- [ ] `import_spotify_data` option to force refetch of all spotify data even if it exists
- [ ] `import_local_tracks` dump in a file or smth the files which can't be imported

## important notes

- use `uri` fields for anything. the `id` field is a lie. don't trust me? check this `spotify:track:2E7W1X4maFFcjHrVrFA7Vs` and this `spotify:track:5zsln7hQof1oQ16eRwiB7s`. check it's id. bomboclaaaaaat

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
