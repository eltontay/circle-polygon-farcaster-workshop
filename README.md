# Circle x Polygon x Farcaster Workshop

This project is a simple web application that demonstrates how to integrate Circle's Developer Controlled Wallets (DCW) API with Polygon and Farcaster. The application allows users to create a new wallet on the Polygon PoS blockchain using a UI built with the Frog framework.

## Technologies Used

- **Frog**: A lightweight frontend framework for building UI components.
- **Circle's Developer Controlled Wallets (DCW)**: An API for managing crypto wallets.
- **Polygon (POL)**: A blockchain used in the wallet creation.
- **Farcaster**: Integrated for social media communication.
- **UUID**: Used for creating idempotency keys.
- **TypeScript/JavaScript**: The language in which the app is built.

## Features

- Create a new wallet on the Polygon (POL) network.
- View the wallet address and network information once the wallet is created.
- Error handling for failed wallet creation attempts.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/eltontay/circle-polygon-farcaster-workshop.git
    cd circle-polygon-farcaster-workshop
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of your project and provide the required environment variables:

    ```bash
    NEXT_PUBLIC_CIRCLE_API_KEY=your_circle_api_key
    NEXT_PUBLIC_CIRCLE_ENTITY_SECRET=your_circle_entity_secret
    NEXT_PUBLIC_ENTITY_SECRET_CIPHER_TEXT=your_entity_secret_ciphertext
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

5. Open the app in your browser at `http://localhost:3000`.


## How It Works

### Wallet Creation Flow

1. The app renders the main page with a button labeled **Create Wallet**.
2. When the user clicks **Create Wallet**, they are prompted to confirm the creation.
3. Upon confirmation, the app calls the Circle Developer Controlled Wallets (DCW) API to create a wallet set and a wallet in the Polygon (POL) network.
4. Once the wallet is created, the app displays the wallet address and network information.
5. If an error occurs during the wallet creation process, the app shows an error message.

### Key Components

- **Frog UI Components**:
    - `Box`, `Heading`, `Text`, and `VStack` are used to structure and style the UI.
    - `Button` is used to capture user actions such as creating a wallet or going back to the home page.

- **API Integration**:
    - The app uses Circle's API to create wallets on the Polygon network.
    - The `uuid` library is used to generate idempotency keys for ensuring the API request is processed only once.

## Environment Variables

You need to configure the following environment variables for the app to work:

- `NEXT_PUBLIC_CIRCLE_API_KEY`: Your Circle API key.
- `NEXT_PUBLIC_CIRCLE_ENTITY_SECRET`: Your Circle entity secret.
- `NEXT_PUBLIC_ENTITY_SECRET_CIPHER_TEXT`: Encrypted secret for interacting with the Circle API.

## Development Tools

- **Devtools**: The app uses the `frog/dev` devtools for easier development and debugging.

## License

This project is licensed under the MIT License.