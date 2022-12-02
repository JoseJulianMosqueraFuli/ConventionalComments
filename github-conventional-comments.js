(async function generateReplies(document) {
    // https://conventionalcomments.org/#labels
    const LABEL = {
        praise: "praise",
        nitpick: "nitpick",
        suggestion: "suggestion",
        issue: "issue",
        todo: "todo",
        question: "question",
        thought: "thought",
        chore: "chore",
    };

    const COMMENT = {
        [LABEL.praise]:
            "Praises highlight something positive. Try to leave at least one of these comments per review. Do not leave false praise (which can actually be damaging). Do look for something to sincerely praise.",
        [LABEL.nitpick]:
            "Nitpicks are small, trivial, but necessary changes. Distinguishing nitpick comments significantly helps direct the reader's attention to comments requiring more involvement.",
        [LABEL.suggestion]:
            "Suggestions propose improvements to the current subject. It's important to be explicit and clear on what is being suggested and why it is an improvement. Consider using patches and the blocking or non-blocking decorations to further communicate your intent.",
        [LABEL.issue]:
            "Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question.",
        [LABEL.todo]:
            "TODO's are small, trivial, but necessary changes. Distinguishing todo comments from issues: or suggestions: helps direct the reader's attention to comments requiring more involvement.",
        [LABEL.question]:
            "Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
        [LABEL.thought]:
            "Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.",
        [LABEL.chore]:
            "Chores are simple tasks that must be done before the subject can be “officially” accepted. Usually, these comments reference some common process. Try to leave a link to the process described so that the reader knows how to resolve the chore.",
    };

    // You can choose the emoticon (emoji) of your choice for each label.
    const EMOJI = {
        [LABEL.praise]:
            ":clap:",
        [LABEL.nitpick]:
            ":pick:",
        [LABEL.suggestion]:
            ":memo:",
        [LABEL.issue]:
            ":bug:",
        [LABEL.todo]:
            ":pencil:",
        [LABEL.question]:
            ":grey_question:",
        [LABEL.thought]:
            ":though_ballon:",
        [LABEL.chore]:
            ":broom:",
    };

    function post(key, token) {
        return fetch("replies", {
            headers: { "content-type": "application/x-www-form-urlencoded" },
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: new URLSearchParams({
                body: `<!-- ${COMMENT[key]}  -->\n**${key}:** ${EMOJI[key]} \n \n<sub><sub> I'm using [conventional comments](https://conventionalcomments.org/url) </sub></sub> ‏`,
                authenticity_token: token,
                title: `${key[0].toUpperCase()}${key.slice(1)}`,
            }).toString(),
        });
    }

    const form = document.querySelector(".new_saved_reply");
    const token = form.querySelector("[name=authenticity_token]").value;
    // Replies are order alphabetically, so order doesn't need to preserved.
    await Promise.all(Object.keys(LABEL).map(key => post(key, token)));
    console.log("All added! Refresh the page!");
})(window.document);