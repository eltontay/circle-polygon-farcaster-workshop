/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { Box, Heading, Text, VStack, vars } from '../../ui';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets'
import { v4 as uuidv4 } from 'uuid';

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY || "",
  entitySecret: process.env.NEXT_PUBLIC_CIRCLE_ENTITY_SECRET || "",
})

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Circle x Polygon x Farcaster Workshop',
  ui: { vars },
});

app.frame('/', (c) => {
  return c.res({
    image: (
      <Box grow alignVertical="center" backgroundColor="purple500" padding="24">
        <VStack gap="4">
          <Heading size="48">Circle x Polygon x Farcaster</Heading>
          <Text size="24">Create a new wallet</Text>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action="/create-wallet">Create Wallet</Button>,
    ],
  });
});

app.frame('/create-wallet', async (c) => {
  const { buttonValue } = c;

  if (buttonValue === 'confirm_create') {
    try {
      const walletSetResponse = await client.createWalletSet({
        name: 'WalletSet ' + Date.now(),
      });

      const createWalletsResponse = await client.createWallets({
        idempotencyKey: uuidv4(),
        count: 1,
        walletSetId: walletSetResponse.data?.walletSet?.id ?? '',
        blockchains: ['MATIC'],
        entitySecretCiphertext: process.env.NEXT_PUBLIC_ENTITY_SECRET_CIPHER_TEXT,
      } as any);

      const wallet = createWalletsResponse.data?.wallets[0];

      if (!wallet) {
        throw new Error('No wallet created');
      }

      return c.res({
        image: (
          <Box grow alignVertical="center" backgroundColor="green500" padding="24">
            <VStack gap="4">
              <Heading size="48">Wallet Created!</Heading>
              <Text size="24">Address: {wallet.address}</Text>
              <Text size="24">Network: MATIC</Text>
            </VStack>
          </Box>
        ),
        intents: [
          <Button action="/">Back to Home</Button>,
        ],
      });
    } catch (error) {
      console.error('Error creating wallet:', error);
      return c.res({
        image: (
          <Box grow alignVertical="center" backgroundColor="red500" padding="24">
            <VStack gap="4">
              <Heading size="48">Error</Heading>
              <Text size="24">Failed to create wallet. Please try again.</Text>
            </VStack>
          </Box>
        ),
        intents: [<Button action="/">Back to Home</Button>],
      });
    }
  }

  return c.res({
    image: (
      <Box grow alignVertical="center" backgroundColor="blue500" padding="24">
        <VStack gap="4">
          <Heading size="48">Create Wallet</Heading>
          <Text size="24">Are you sure you want to create a new wallet?</Text>
        </VStack>
      </Box>
    ),
    intents: [
      <Button value="confirm_create">Confirm</Button>,
      <Button action="/">Cancel</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);