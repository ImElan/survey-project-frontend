// export const PROMOTIONS = [
//     {
//       id: 0,
//       name: 'Weekend Grand Buffet',
//       image: '/assests/images/buffet.png',
//       label: 'New',
//       price: '19.99',
//       featured: true,
//       description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person'
//     }
//   ];

export const questionss = [
    {
        questions:
        {
            questionId: 1,
            question: 'Are you good in accolite ?',
            options: [
                { optionId: 1, option: 'Option 1' },
                { optionId: 2, option: 'Option 2' },
            ],
            questionType: 'DESCRIPTIVE',
            required: false,
        },
        answer: 'yeah good',
        isvalid: false
    },
    {
        questions:
        {
            questionId: 2,
            question: 'Are you good in accolite ?',
            options: [
                { optionId: 1, option: 'Option 1' },
                { optionId: 2, option: 'Option 2' },
                { optionId: 3, option: 'Option 3' },
                { optionId: 4, option: 'Option 4' },
            ],
            questionType: 'SINGLE',
            required: false,
            isValid: false
        },
        answer: 'Option 3',
        isvalid: false
    },
    {
        questions:
        {
            questionId: 3,
            question: 'Are you feeling good in accolite ?',
            options: [
                { optionId: 1, option: 'Option 1' },
                { optionId: 2, option: 'Option 2' },
                { optionId: 3, option: 'Option 3' },
                { optionId: 4, option: 'Option 4' },
            ],
            questionType: 'MULTIPLE',
            required: false,
            isValid: false
        },
        answer: ['Option 1', 'Option 2'],
        isvalid: false
    },
    {
        questions:
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