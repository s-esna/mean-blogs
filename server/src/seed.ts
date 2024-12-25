import { collections, connectToDatabase } from "./config/database";
import * as mongodb from 'mongodb'
import bcrypt from 'bcrypt';
import { SERVER_CONFIG } from "./config/env";
import { ADMIN_PASSWORD } from "./config/env";
const {ATLAS_URL, PORT} = SERVER_CONFIG;

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; 
  return await bcrypt.hash(password, saltRounds);
};


//Function to seed data
const seedData = async () => {
  try {
    
//Sample data for seeding
const blogs = [
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-01-01'),
      title: 'Ένας χρόνος διαδηλώσεις στο Σύνταγμα ενάντια στη γενοκτονία του Παλαιστινιακού λαού',
      body: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      img: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/466850715_999181262223829_2859200878334272673_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=20UPyN2UhvoQ7kNvgFdxuig&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=Ah7m9gOLHFvIdaVzShcF1h0&oh=00_AYBaHxUOZLyyIBkSVlTcW107n2EzAPSya9wR-XyzzOoTFA&oe=6768D1C3',
      tags: ['typescript', 'programming', 'javascript'],
      comments: [
        {
          username: 'coder123',
          date: new Date('2024-01-02'),
          commentBody: 'Great introduction to TypeScript!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-01-05'),
      title: 'Understanding MongoDB',
      body: 'MongoDB is a NoSQL database that uses JSON-like documents to store data.',
      img: 'https://scontent.fath2-1.fna.fbcdn.net/v/t1.15752-9/448695937_842594557763230_7788674336670307349_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XbzdiNpsHFoQ7kNvgHDiVt-&_nc_zt=23&_nc_ht=scontent.fath2-1.fna&oh=03_Q7cD1QE0Y_jd47uP9vr2_fCPHuFJYibDPuNZdB-LwFUHJTTBiA&oe=67820A55',
      tags: ['mongodb', 'database', 'nosql'],
      comments: [
        {
          username: 'dbguru',
          date: new Date('2024-01-06'),
          commentBody: 'I love using MongoDB for my projects!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-01-10'),
      title: 'Top 10 JavaScript Frameworks in 2024',
      body: 'Here are the top JavaScript frameworks to learn in 2024.',
      img: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/470584259_1022852949856660_9101602021720571188_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KyWjlAnBfzcQ7kNvgGgquer&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AchagWx7m1hNdvDRgTMTCdh&oh=00_AYBwEQCY98fHdUYWL849ReXr211huj4hMpRlXTFZj15IdA&oe=6768DEED',
      tags: ['javascript', 'frameworks', 'web'],
      comments: [
        {
          username: 'frontenddev',
          date: new Date('2024-01-11'),
          commentBody: 'Great list! I would add Vue.js too.',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-01-15'),
      title: 'What is REST API?',
      body: 'REST stands for Representational State Transfer, a key concept in API design.',
      img: 'https://i.kym-cdn.com/entries/icons/facebook/000/045/201/cover3.jpg',
      tags: ['rest', 'api', 'backend'],
      comments: [
        {
          username: 'apibuilder',
          date: new Date('2024-01-16'),
          commentBody: 'REST APIs are essential for modern web apps.',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-01-20'),
      title: 'Building Responsive Websites',
      body: 'Responsive web design ensures that your site looks great on all devices.',
      img: 'https://us-tuna-sounds-images.voicemod.net/c419b4cd-603e-4dfd-8099-fd99240727f3-1698570427602.jpg',
      tags: ['web', 'responsive', 'css'],
      comments: [
        {
          username: 'designer',
          date: new Date('2024-01-21'),
          commentBody: 'Responsive design is a must in today’s world!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-01'),
      title: 'Mastering Angular Services',
      body: 'Learn how to use Angular services to manage shared data and logic in your app.',
      img: 'https://i.ytimg.com/vi/of0xeTke6HU/mqdefault.jpg',
      tags: ['angular', 'services', 'frontend'],
      comments: [
        {
          username: 'angularfan',
          date: new Date('2024-02-02'),
          commentBody: 'Angular services make life so much easier!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-05'),
      title: 'Node.js Performance Tips',
      body: 'Optimize your Node.js applications for speed and efficiency.',
      img: 'https://ih1.redbubble.net/image.5186630478.3007/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg',
      tags: ['nodejs', 'performance', 'backend'],
      comments: [
        {
          username: 'backenddev',
          date: new Date('2024-02-06'),
          commentBody: 'These tips helped me a lot!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-10'),
      title: 'Understanding JWT Authentication',
      body: 'JWT is a popular standard for securing APIs.',
      img: 'https://i.kym-cdn.com/photos/images/newsfeed/002/945/475/182.jpeg',
      tags: ['jwt', 'security', 'authentication'],
      comments: [
        {
          username: 'authguru',
          date: new Date('2024-02-11'),
          commentBody: 'JWT is powerful but should be used carefully!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-15'),
      title: 'Deploying MEAN Stack Applications',
      body: 'Step-by-step guide to deploying your MEAN stack application to the cloud.',
      img: 'https://i.imgflip.com/7hyh5e.png?a481752',
      tags: ['mean', 'deployment', 'cloud'],
      comments: [
        {
          username: 'devopspro',
          date: new Date('2024-02-16'),
          commentBody: 'Deployment made simple, thanks!',
        },
      ],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-15'),
      title: 'The Art of Coding',
      body: 'Exploring the intricacies and beauty of writing clean and maintainable code. errorerror ',
      img: 'https://scontent.fath2-1.fna.fbcdn.net/v/t1.15752-9/449432300_792674429352431_1511850089277013191_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_ohc=h_eDzEChsugQ7kNvgHrMT8d&_nc_zt=23&_nc_ht=scontent.fath2-1.fna&oh=03_Q7cD1QG9X-gc5ydIUgopYbkpejZnvI5tBxFKstZesI7XK0calA&oe=67822300',
      tags: ['metal', 'sludge', 'cloud'],
      comments: [],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-15'),
      title: 'Top 10 JavaScript Frameworks',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessitatibus dolorem fugiat! Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga deserunt nobis maiores omnis nulla doloribus illo accusantium nostrum delectus. Doloremque inventore eius a saepe cupiditate dolorum laborum totam repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, incidunt! Quaerat, libero! Provident repudiandae quibusdam mollitia itaque voluptates architecto doloribus, harum esse eaque ducimus aut, nemo blanditiis nobis odit eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio corrupti velit enim eius quibusdam doloribus, commodi aspernatur reprehenderit soluta fugiat sit pariatur itaque omnis molestias ducimus, sapiente ab repudiandae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt totam in possimus, omnis corrupti adipisci a repellendus quod ducimus iusto. Quisquam tenetur delectus architecto velit? Illo, possimus id? Assumenda, consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo ipsa error aut aliquid neque eligendi, quia blanditiis dicta. Sint assumenda inventore quam harum eius quibusdam necessit',
      img: 'https://scontent.fath2-1.fna.fbcdn.net/v/t1.15752-9/451279439_804601635126463_4057437763850553080_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=kvFUESOMTG0Q7kNvgGtkY78&_nc_zt=23&_nc_ht=scontent.fath2-1.fna&oh=03_Q7cD1QH-kf9JDPsPtr9c-tNdHJz4QzkqAy_vycSv6B60g7txYw&oe=67822629',
      tags: ['mean', 'deployment', 'cloud'],
      comments: [],
    },
    {
      _id: new mongodb.ObjectId(),
      date: new Date('2024-02-15'),
      title: 'The Hell of Debuggin',
      body: 'Spend hours looking for the bug',
      img: 'https://scontent.fath2-1.fna.fbcdn.net/v/t1.15752-9/457142792_1056016916012063_5759892265840018780_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=H_TrHlp2WcYQ7kNvgE6VLaU&_nc_zt=23&_nc_ht=scontent.fath2-1.fna&oh=03_Q7cD1QG8WodB4k1wjvkEBEFkmgDWPmL1VxvN91Dm2lxjFmzJ9A&oe=67820F11',
      tags: ['mean', 'deployment', 'cloud'],
      comments: [],
    },
  ];
    if (!ADMIN_PASSWORD) {
      console.log("please put a password in the .env file and restart")
      process.exit(1)
    }
    const hashedPassword = await hashPassword(ADMIN_PASSWORD)
    const users = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        isAdmin: true,
        _id : new mongodb.ObjectId()
      }
    ];

    if (!ATLAS_URL) {
        console.error("please put a a MongoDB atlas url in the .env file and restart")
        process.exit(1)
    }
    // Connect to MongoDB
    const client = await connectToDatabase(ATLAS_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    if (collections.blogs) {
      await collections.blogs.deleteMany({});
      console.log('Existing blogs cleared.');
    }

    // Insert new data
    const createdUsers = await collections.users?.insertMany(users);
    console.log(`${createdUsers?.insertedCount} users inserted`);

    const createdBlogs = await collections.blogs?.insertMany(blogs);
    console.log(`${createdBlogs?.insertedCount} blogs inserted`);

    // Disconnect from MongoDB
    await client.close();
    console.log('Database seeding completed and disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit process with failure
  }
};

// Run the seed function
seedData();
