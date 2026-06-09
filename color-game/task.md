# Color Game (30 mins)

Create a color memory game inspired by Simon Says.

Display four large buttons arranged in a 2×2 grid, each with a different color (for example, red, blue, yellow, and green). Above the buttons, display the current round number and a status message (for example, "Correct!" or "Incorrect!").

When the page loads, the game starts automatically.

The game works as follows:

1. A sequence of colors is shown to the user. Each color in the sequence should light up briefly (for example by increasing brightness or opacity) before returning to its normal state.
2. After the sequence has finished playing, the user must repeat the sequence by clicking the colored buttons in the correct order. When the user clicks a button, it should also light up briefly to provide feedback.
3. Once the user has entered a sequence of the same length as the original, the game checks if the user's input matches the original sequence.
4. If the user successfully reproduces the sequence, a new random color is appended to the end of the sequence, and the next round begins after a short delay.
5. If the user has made a mistake, the same sequence is played again, and the user gets to try again.

On the first round, the sequence should consist of three colors. Each subsequent round adds one additional random color to the end of the sequence. Colors may be repeated in the sequence.

Please see the video example.
