import {model,Schema} from "mongoose";

// Creating course model
const courseSchema=new Schema({
    title:{
        type:String,
        required:[true,"Course title is required"],
        minLength:[8,"Course title must be atleast 8 characters"],
        maxLength:[50,"Course title cannot exceed 50 characters"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Course description is required"],
        minLength:[10,"Course description must be atleast 8 characters"],
        maxLength:[100,"Course description cannot exceed 100 characters"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"Course category is required"]
    },
    thumbanil:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                },
                secure_url:{
                    type:String
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:[true,"Author name is required"]
    }
},{
    timestamps:true
});

const Course=model("Courses",courseSchema);
export default Course;