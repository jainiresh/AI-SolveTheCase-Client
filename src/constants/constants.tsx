
export const backendUrl= process.env.BACKEND_URL || 'https://ai-solvethecase.onrender.com' || 'http://localhost:3000'
export const frontEndUrl= process.env.FRONTEND_URL || 'https://ai-solvethecase-client.onrender.com' || 'http://localhost:3001'

export const LOGIN_URL = process.env.LOGIN_URL || backendUrl + "/auth/nylas/hostedAuth";
export const LOADING_MESSAGES = [
    'Creating a story',
    'Let the magic happen',
    'It might take upto a moment',
    'Rest assured, please be patient',
    'Almost there !',
    'Good things take time'
  ]
export const INVESTIGATING_MESSAGES = [
    'Investigating ... ',
    'Questioning...',
    'Asking nearby witnesses...',
    'Gathering info...',
    'Found some, looking deeper...',
    'Enumerating collected info ... ',
    'Analyzing data...',
    'Cross-referencing details...',
    'Checking for inconsistencies...',
    'Consulting experts...',
    'Formulating conclusions...',
    'Validating findings...',
    'Reviewing results...',
    'Synthesizing information...',
    'Preparing final report...',
    'Almost done...',
    'Just a moment...',
    'Finalizing details...',
    'Ensuring accuracy...',
    'Completing investigation...',
    'Ready in a second...',
    'Almost there...',
    'Double-checking...',
    'Tidying up...',
    'Wrapping up...',
    'Preparing to present results...'
  ];

  export const testDay = `
  Morning i woke up, and my gardener was watering my plants .\nHe was cheerful as everyday, singing while watering the plants.\n\nI got up and took up my laptop.\nMy friend Antony called, but when i picked up he did not speak, and the call got disconnected in a few seconds.\n\nThen i worked up to noon, then my maiden came and collected all my clothes.\nShe did not speak to me properly, and she told that it was a family problem so i did not ask deeper details from her.\n\nThen evening i went to the gym , my trainer ALI was there, also working out with his other friends Veronica, and Saru.\n\nI went to the medical shop, and bought some digestive tablets, as i had some stomach ache.\nThe person in the reception was a bit sad, but was working seriously.\n\nThen i came home, and slept`;
  