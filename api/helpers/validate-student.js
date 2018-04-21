module.exports = {


  friendlyName: 'Validate query',


  description: '',


  inputs: {
    student: {
        type: {}
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const validate = require('validate.js');
      // All done
      let studentConstraint = {
        mssv: {
          presence: true,
          format: {
              pattern: /^\d{8}$/,
              message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                  return "gồm 8 số."
              }
          }
        },
        name: {
            presence: true,
            format: {
                pattern: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return "chỉ chứa ký tự tiếng việt, khoảng trắng";
                }
            }
        
        },
        dateOfBirth: {
            presence: true,
            format: {
                pattern: /\d\d\d\d\-\d\d\-\d\d/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return "có dạng yyyy-MM-dd";
                }
            }
    
        },
        gender: {
            presence: true,
            format: {
                pattern: /Nam|Nu/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return "nam hoặc nữ";
                }
            }
        },
        address: {
            presence: true,
            format: {
                pattern: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return "chỉ chứa ký tự tiếng việt, khoảng trắng";
                }
            }
        }
    }

    let results = validate(inputs.student, studentConstraint);
    return exits.success(results);

  }


};

