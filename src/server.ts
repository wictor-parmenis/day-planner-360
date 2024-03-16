import { app } from './app';

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => { console.log(`Server is running now in port ${PORT}`) });
