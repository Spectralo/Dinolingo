# Dinolingo 🦖🌸✨

Dinolingo is an Android/IOS app that make you draw dinos everyday and help you create your own little collection of dinos!!!! \
Keep your streak or dino will come ... (he's actually nice :) )

## Installation

### Simple way

- Just grab the latest release from the [releases page](github.com/spectralo/dinolingo/releases) and install it on your phone

### Build it yourself

- Clone the repo
    ```bash
    git clone https://github.com/spectralo/dinolingo/
    ```
- Cd into the repo
    ```bash
    cd dinolingo
    ```
- Install the dependencies
    ```bash
    bun install
    ```

Now you can choose to build a dev client or a standalone apk:

#### Dev client

- Prebuild the app
    ```bash
    bunx expo prebuild --platform android
    ```
- Start the expo server
    ```bash
    bunx expo run:android
    ```

#### Standalone apk

- Build the apk
    ```bash
    bunx eas build --platform android --profile apk
    ```
-(Add --local flag to compile on your own machine)
- You can now install the apk on your phone!

## Usage

Just connect using slack and start drawing your dino! \

## Contributing

You can contribute by opening an issue or a pull request! \

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
