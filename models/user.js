const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:String,
  email:String,
  password:String,
  phone:String,
  data: {
      doc:{
          link:String,
      },
      details:{
        basic:{
            name:String,
            email:String,
            dob:String,
            phone:String
           
        },    
        personal:{
              gender:String,
              marital:String,
              familymembers:String,
              occupation:String,
              familyincome:String,
              individualincome:String,
              facebook:String,
              linkedin:String,
              twitter:String,
              address:String,
              skills:String,
              eca:String,
              higheduqual:String
          },
          educational:{
            highschool:String,
            college:String,
            bfield:String,
            buniversity:String,
            mfield:String,
            muniversity:String,
            toeflscore:String,
            grescore:String,
            gmatscore:String,
            ieltsscore:String,
            additionalqual:String
        },
        professional:{
            onerole:String,
            onelocation:String,
            onesalary:String,
            tworole:String,
            twolocation:String,
            twosalary:String
        },
        interest:{
            nextmove:String,
            fieldofinterest:String,
            joblocation:String,
            jobtype:String,
            desiredsalary:String,
            desiredlivingexp:String,
            desirefive:String,
            desireten:String,
            onegoal:String,
            twogoal:String
        },
        lifestyle:{
            entertainment:String,
            living:String,
            food:String,
            travel:String,
            electronics:String,
            misc:String
        }
                
      }
  } 
}) 

module.exports = mongoose.model('Users',userSchema);
