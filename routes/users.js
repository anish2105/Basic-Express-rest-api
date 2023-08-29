import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [
    {
        fname: "John",
        lname: "Doe",
        age:25
    },
    {
        fname: "Jane",
        lname: "Doe",
        age:25
    },
]

router.get('/', (req, res) => {
    console.log(users);
    res.send(users);
});


router.post('/', (req, res) => {
        console.log("Post route reached");
        const user = req.body;
        const userId = uuidv4();
        const userwithID = {...user, id : userId};
        users.push(userwithID);
        // or user.push({ ...user,id:uuidv4()});
        res.send(`User with username ${user.fname} added to database`);
});

router.get('/:id',(req,res) => {    
    // res.send('Id testing') ;
    const {id} = req.params;
    const foundU = users.find((user)=>user.id==id);
    res.send(foundU);
});

router.delete('/:id',(req,res) => { 
    const {id} = req.params;
    users = users.filter((user) => user.id!=id);
    res.send(`User with id ${id} deleted from database`);
});



router.patch('/:id',(req,res) => { 
    const {id} = req.params;
    const { fname , lname , age} = req.body;

    const user = users.filter((user) => user.id==id);
    if (fname){
        user.fname = fname;
    }
    if (lname){
        user.lname = lname;
    }
    if (age){
        user.age = age;
    }

    res.send(`User with id ${id} updated from database`);
});

export default router;