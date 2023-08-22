const { extractData, processData } = require('../functions.js');

const testCases = {
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
                unit: "hours"
            }   
        ],
        [
            {
                foo: "bar",
                attendance_1: 4,
                attendance_2: 22,
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
                attendances: [4, 22, 0, 50],
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

    test("returns processedData for valid queries", () => {
        test.each(testCases.valid)('.extractData(%i)', (input, expected) => {
            expect(input).toBe(expected);
        })
    });

    test("throws error for different counts of attendances/availabilities/hours", () => {
        test.each(testCases.diffCounts)('.extractData(%i)', (input) => {
            expect(()=>extractData(input)).toThrow();
        })
    });

});