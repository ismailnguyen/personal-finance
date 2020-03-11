# personal-finance

```
git clone https://github.com/mathieueveillard/personal-finance.git
```

## API (mock)

```
cd api
npm ci
npm start
```

## SPA

```
cd spa
npm ci
```

Then create a `.env` file and write the following line in it:

```
PUBLIC_URL=/
REACT_APP_URL_ROOT=http://localhost:5000
```

Then you can start the development server:

```
npm start
```

PS: on MacOSX, after upgrade to macOS Catalina, you may need to follow [those instructions](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md).
