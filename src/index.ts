import express, {Request, Response} from 'express';
import cors from "cors";

const app = express();
const port = 4000;

const weatherApiKey: string = process.env.WEATHER_API_KEY || '96832054eb52b15f742c63615e2bbf26';
const city: string = 'San_Francisco';
const weatherApiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
    
function add(a:number, b:number): number {
    return a + b;
}

let userAge: number = 30;
let firstName: string = 'Sachin';
let isAdmin: boolean = true;

let user: {
    id: number;
    name: string;
    email: string;
    age?: number;
    firstName: string;
    isAdmin?: boolean;
} = {
    id: 1,
    name: 'John Doe',
    email: 'sachin.gen@gmail.com',
    age: userAge,
    firstName: 'Sachin',
    isAdmin: true
    };  

const users: User[] = [
  { id: 1, name: "Alice", email: "sachin@gmail.com", age: 25,   firstName: "Sachin", isAdmin: true  },
  { id: 2, name: "Bob", email: "bob@gmail.com", age: 30, firstName: "Bob", isAdmin: false  },
  { id: 3, name: "Charlie", email: "charlie@gmail.com", firstName: "Charlie"  }           
]


app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('API is running successfully!');
}); 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!' +  add (2, 3)  );
});     

app.get('/user/:id', (req: Request, res: Response) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        console.log('User not found with id:', req.params.id);
        return res.status(404).json({ message: 'User not found' });
    }   
  res.status(200).json({
    user: user  
  });
}); 

app.get('/sahaj', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello from Sahaj! ( ^_^ )  sahaj'
  });
}   );  

app.get('/weather/:city', (req: Request, res: Response) => {
    console.log('Fetching weather data for city:', req.params.city);
    const cityParam = req.params.city;
    const city = cityParam.split("_").join(" ");
    console.log('city:', city);
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`;
    console.log('url:', weatherApiUrl);
    fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('data:', data);
        console.log(`Temperature in ${city}: ${data.main.temp}°C`);
        res.status(200).json({
            temperature: data
        });
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    });
}); 

app.listen(port, () => {    
    console.log(`Server is running at http://localhost:${port}`);   
}); 