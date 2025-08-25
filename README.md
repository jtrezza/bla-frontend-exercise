This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To install the dependencies, run:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Compatible with different APIs

By default, the application uses the public pokeapi API to work. If you are running the back-end locally, you can create a `.env` file and add a NEXT_PUBLIC_API_BASE_URL with the value "http://localhost:8000". Check the file `.env.example` for guidance.

Note that the pokeapi.co option will return the **full** list of Pokémon, while the local back-end will return only the 151 of the first generation.

Note 2: If you change the port in which this application will be running, you should update the allowed `origins` array in `main.py` of the back-end project when using the local back-end.

## Testing

To run the tests, run `npm run test`
