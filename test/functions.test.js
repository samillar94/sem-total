const { extractData, processData } = require('../functions.js');

const extractDataSuites = {
    valid: [
        [
            {
                attendance_1: 0,
                attendance_2: 1,
                attendance_3: 10,
                attendance_4: 55,
                availability_1: 33,
                availability_2: 22,
                availability_3: 44,
                availability_4: 55,
                unit_1: "hours",
                unit_2: "hours",
                unit_3: "hours",
                unit_4: "hours"     
            },
            {
                attendances: [0, 1, 10, 55],
                availabilities: [33, 22, 44, 55],
                unit: "hours"
            }   
        ],
        [
            {
                foo: "bar",
                attendance_1: 4,
                attendance_2: 22.5,
                attendance_3: 0,
                attendance_4: 50,
                availability_1: 60,
                availability_2: 60,
                availability_3: 60,
                availability_4: 60,
                unit_1: "horas",
                unit_2: "horas",
                unit_3: "horas",
                unit_4: "horas"
            },
            {
                attendances: [4, 22.5, 0, 50],
                availabilities: [60, 60, 60, 60],
                unit: "horas"
            }   
        ],
        [
            {
                attendance_1: 4,
                attendance_2: 22,
                availability_1: 60,
                availability_2: 60,
                unit_1: "h",
                unit_2: "h",
            },
            {
                attendances: [4, 22],
                availabilities: [60, 60],
                unit: "h"
            }   
        ],

    ],
    diffCounts: [
        [
            {
                attendance_1: 0,
                attendance_2: 1,
                availability_1: 33,
                availability_2: 22,
                availability_3: 44,
                availability_4: 9,
                unit_1: "hours",
                unit_2: "hours",
                unit_3: "hours",
                unit_4: "hours"     
            }   
        ],
        [
            {
                attendance_1: 0,
                attendance_2: 1,
                attendance_3: 10,
                attendance_4: 55,
                availability_1: 33,
                availability_2: 22,
                availability_3: 44,
                unit_1: "hours",
                unit_2: "hours",
                unit_3: "hours",
                unit_4: "hours"     
            }   
        ],
        [
            {
                attendance_1: 0,
                attendance_2: 1,
                attendance_3: 10,
                attendance_4: 55,
                availability_1: 33,
                availability_2: 22,
                availability_3: 44,
                availability_4: 55 
            }   
        ],
        [
            {
                attendance_1: 0,
                attendance_2: 1,
                attendance_3: 10,
                attendance_4: 55,
            }   
        ],

    ]
}

describe("extractData", () => {

    // let index = 0;
    test.each(extractDataSuites.valid)('returns extractedData for valid query (%#)', (input, expected) => {
        expect(extractData(input)).toMatchObject(expected);
        // index++;
    }, )

    // index = 0;
    test.each(extractDataSuites.diffCounts)('throws error for different counts of attendances/availabilities/units (%#)', (input) => {
        expect(()=>extractData(input)).toThrow();
        // index++;
    })

    /// TODO negatives etc.

});

const processDataSuites = {
    valid: [
        [
            {
                attendances: [0, 1, 10, 55],
                availabilities: [33, 22, 44, 55],
                unit: "hours"
            },
            {
                error: false,
                data: {
                    total: 66,
                    totalAvailable: 154,
                },
                lines: ["Total of 66 hours attended, of 154 available"]
            }
        ],
        [
            {
                attendances: [4, 22.5, 0, 50],
                availabilities: [60, 60, 60, 60],
                unit: "h"
            },
            {
                error: false,
                data: {
                    total: 76.5,
                    totalAvailable: 240,
                },
                lines: ["Total of 76.5 h attended, of 240 available"]
            }
        ],
        [
            {
                attendances: [4, 22],
                availabilities: [60, 60],
                unit: "classes"
            },
            {
                error: false,
                data: {
                    total: 26,
                    totalAvailable: 120
                },
                lines: ["Total of 26 classes attended, of 120 available"]
            }
        ]
    ],

    /// TODO
};

describe("processData", () => {

    // let index = 0;
    test.each(processDataSuites.valid)('returns processedData for valid query (%#)', (input, expected) => {
        expect(processData(input)).toMatchObject(expected);
        // index++;
    });

});