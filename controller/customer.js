const customer=require('../models/customer');

const addCustomer=async(req,res)=>{
    try{
         const data=new customer({
            fullName:req.body.fullName,
            mobileNumber:req.body.mobileNumber,
            address:req.body.address,
            email:req.body.email,
            shiftTiming:req.body.shiftTiming,
            plantOwnerId:req.body.plantOwnerId,
            subscribeProduct:req.body.subscribeProduct,
            lattitude:req.body.lattitude,
            plantId:req.body.plantId,
            customerId:req.body.customerId,
            password:req.body.password
         })
         const result = await data.save();
         res.json({responsse_code:200,response_msg:"success",data:result});
        } catch (error) {
          console.error('Error creating for customer:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const getAllCustomer=async(req,res)=>{

      try{
           const result=await customer.find();
           res.json({responsse_code:200,response_msg:"success",data:result});
          } catch (error) {
            console.error('Error for fetching customer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }

    const getCustomersById=async(req,res)=>{
      const {custId}=req.params.customerId
      try{
        const response=await  customer.findById({customerId:custId})
        res.status(200).json({response_msg:"success",data:response});
      }catch(error){
        console.error('error for getting the customer',error)
        res.status(500).json({error:'Internal server error'});
      }
    }

    module.exports={
        addCustomer,
        getAllCustomer,
        getCustomersById
    }