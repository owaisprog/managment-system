const admission_Form = require('../models/admissionForm');
const personalInfo = require('../models/personalinfo');
const contactInfo = require('../models/contactInfo');
const feeInfo = require('../models/feeInfo')
const signup = require('../models/signup')


// define assocation 

admission_Form.hasOne(personalInfo, { foreignKey: 'admissionFormId' });
admission_Form.hasOne(contactInfo, { foreignKey: 'admissionFormId' });
admission_Form.hasOne(feeInfo, { foreignKey: 'admissionFormId' });



// reverse Association


personalInfo.belongsTo(admission_Form, { foreignKey: 'admissionFormId' });
contactInfo.belongsTo(admission_Form, { foreignKey: 'admissionFormId' });
feeInfo.belongsTo(admission_Form, { foreignKey: 'admissionFormId' })


// delete




module.exports = { admission_Form, personalInfo, contactInfo, feeInfo };