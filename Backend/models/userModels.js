import {Schema,model} from "mongoose";
import bcrypt from "bcrypt";
const avatarSchema = new Schema({
    public_id: {
      type: String,
      default: 'default_public_id', // You can set a default value if needed
    },
    secure_url: {
      type: String,
      default: 'https://picsum.photos/200/300?grayscale', // Default URL for the avatar
    },
  });
const schema =new Schema({
    fullName:{
        type:"String",
        required:[true,"Name is a required field"],
        minLength:[5,"Name must be of 5 characters"],
        maxLength:[50,"Name should not exceed 50 characters"],
        trim:true
    },
    email:{
        type:"String",
        required:[true,"Email is a required field"],
        minLength:[5,"Email must be of 5 characters"],
        maxLength:[50,"Email should not exceed 50 characters"],
        trim:true,
        lowercase:true
        // match:["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$","Please enter a valid email"]
    },
    password:{
        type:"String",
        required:[true,"password is a required field"],
        minLength:[5," must be of 5 characters"],
        maxLength:[15," should not exceed 15 characters"],
        trim:true,
        select:false
    },
    avatar: avatarSchema,
    role:{
        type:"String",
        enum:["USER","ADMIN"],
        default:"USER"
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
});
schema.pre("save",async function(next){
    if(this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

const user=model("LmsUsers",schema);
export default user;