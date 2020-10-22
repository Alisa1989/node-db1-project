const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req,res,next) => {
    try{
        const accounts = await  
        db.select("*")
        .from("accounts")
        res.json(accounts)
    } catch (err){
        next(err)
    }
})

router.get("/:id", async (req,res,next) => {
    // console.log("does ID exist?",doesIdExist(0))
    // console.log("does ID exist?",doesIdExist(1))
    // console.log("does ID exist?",doesIdExist(req.params.id))
    if(!getAccountById(req.params.id)){ // WHY IS THIS NOT WORKING?
        return res.status(404).json({
            error: "account not found"
        })
    }
    try{
        const account = await getAccountById(req.params.id)
        res.status(200).json(account)
    }catch(err){
        next(err)
    }
})

router.post("/", async (req,res,next) => {
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
    
        if(!payload.name || !payload.budget){
            return res.status(400).json({
                message: "Request needs name and budget"
            })
        }

    const [id] = await db.insert(payload).into("accounts")

    res.status(201).json(await getAccountById(id))
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req,res,next) => {
    try{

    }catch(err){
        next(err)
    }
})

router.delete("/:id", async (req,res,next)=>{
    try{
        await db("accounts")
        .where("id", req.params.id)
        .del()

        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// middleware
function getAccountById(id){
    return db   
        .first("*")
        .from("accounts")
        .where("id", id)
}

// function doesIdExist(id){
//     const count = db
//         .count("*")
//         .from("accounts")
//         .where("id", id)
    
//     if (count == 0){return false}

//     return true
// }

module.exports = router;