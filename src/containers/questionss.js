// export const  questionss = [
//     {
//         questions : 
//         {
//            questionId: 1,
//             question: 'Are you good in accolite ?',
//             options: [
//                 { optionId: 1, option: 'Option 1' },
//                 { optionId: 2, option: 'Option 2' },
//             ],
//             questionType: 'DESCRIPTIVE',
//             required: false,
//             isValid: false
//         },
//         answerarr:[],
//         answer:'',
//         isvalid:false
//     },
//     {
//         questions : 
//         {
//            questionId: 2,
//             question: 'Are you good in accolite ?',
//             options: [
//                 { optionId: 1, option: 'Option 1' },
//                 { optionId: 2, option: 'Option 2' },
//                 { optionId: 3, option: 'Option 3' },
//                 { optionId: 4, option: 'Option 4' },
//             ],
//             questionType: 'SINGLE',
//             required: false,
//             isValid: false
//         },
//         answerarr:[],
//         answer:'',
//         isvalid:false
//     },
//     {
//         questions : 
//         {
//            questionId: 3,
//             question: 'Are you feeling good in accolite ?',
//             options: [
//                 { optionId: 1, option: 'Option 1' },
//                 { optionId: 2, option: 'Option 2' },
//                 { optionId: 3, option: 'Option 3' },
//                 { optionId: 4, option: 'Option 4' },
//             ],
//             questionType: 'MULTIPLE',
//             required: false,
//             isValid: false
//         },
//         answerarr:[],
//         answer:'',
//         isvalid:false
//     }
// ];


export const questions = [
    {
        questionId: 1,
        question: 'Are you good in accolite ?',
        options: [
            'Option 1',
            'Option 2'
        ],
        questionType: 'DESCRIPTIVE',
        required: false,
    },
    answer: 'yeah good',
    isvalid: false
    },
{
    questionId: 2,
        question: 'Are you good in accolite ?',
            options: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4'
            ],
                questionType: 'SINGLE',
                    required: false,
                        isValid: false
},
answer: 'Option 3',
    isvalid: false
    },
{

    questionId: 3,
        question: 'Are you feeling good in accolite ?',
            options: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4'
            ],
                questionType: 'MULTIPLE',
                    required: false,
                        isValid: false
},
answer: ['Option 1', 'Option 2'],
    isvalid: false
    },
{

    questionId: 4,
        question: 'How much do you rate Accolite as a company?',
            numStars: 7,
                isHalfStarAllowed: true,
                    questionType: 'STAR',
                        required: false,
                            isValid: false
},
answer: '4',
    isvalid: false
    }
];