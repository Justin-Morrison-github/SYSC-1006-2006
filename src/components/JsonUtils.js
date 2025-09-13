import { useState, useEffect } from "react";

export async function loadLectureJson(lecture, file) {
    try {
        const response = await fetch(import.meta.env.BASE_URL + `content/lectures/${lecture}/${file}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JS object
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        return null;
    }
}

export async function loadExerciseJson(exercise) {
    try {
        const response = await fetch(import.meta.env.BASE_URL + `content/exercises/${exercise}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JS object
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        return null;
    }
}

export function useJSONLoad({ slugs, exercisenumber, question }) {
    const [parsedQuestion, setParsedQuestion] = useState(null)

    useEffect(() => {
        // Load JSON only once or when lecture/file/question change
        if (slugs?.lecture !== undefined && slugs?.lectureTopic !== undefined) {
            loadLectureJson(slugs?.lecture, slugs?.lectureTopic).then(data => {
                // console.log(data);
                const questionGroup = data[exercisenumber]

                const q = questionGroup ? questionGroup[question] : null;

                // console.log(q);

                setParsedQuestion(q);
            });
        }
        else if (slugs?.exercise !== undefined) {
            loadExerciseJson(slugs?.exercise).then(data => {
                const q = data[question];
                setParsedQuestion(q);
            });
        }


    }, [question, slugs, exercisenumber]); // re-run if these change

    return { parsedQuestion, setParsedQuestion }
}
