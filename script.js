// Application State
let currentScreen = 'work-order-screen'; // Skip login and permissions for demo
let currentInterview = 0;
let currentStep = 1;
let permissions = {
    photos: false,
    audio: false,
    location: false
};

// Interview data structure
const interviews = [
    { id: 'GH55_001_20201225_1111', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1112', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1113', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1114', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1115', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1116', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1117', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1118', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1119', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} },
    { id: 'GH55_001_20201225_1110', completed: false, steps: 4, filledSteps: 0, stepData: {}, recordings: {} }
];

// Management Team Interviews data structure
const managementInterviews = [];

// Current management interview state
let currentManagementInterview = 0;
let currentManagementStep = 1;

// Live Interviews data structure
const liveInterviews = [];

// Current live interview state
let currentLiveInterview = 0;
let currentLiveStep = 1;

// Phone Checks data structure
const phoneChecks = [];

// Current phone check state
let currentPhoneCheck = 0;

// Recording questions content
const recordingQuestions = {
    'sound-check': {
        title: 'Sound Check (Optional)',
        instruction: 'Ask the manager to speak into the microphone at a normal volume.',
        isOptional: true
    },
    'familysearch-expectations': {
        title: 'FamilySearch Expectations',
        instruction: 'Ask the manager: Describe FamilySearch\'s expectations when they buy your interviews.',
        isOptional: false
    },
    'quality-of-interviews': {
        title: 'Quality of Interviews',
        instruction: 'Ask the manager: Define your role in controlling the quality of interviews.',
        isOptional: false
    },
    'interview-fabrication': {
        title: 'Interview Fabrication',
        instruction: 'Ask the manager: What do you do to stop fabrication of interviews?',
        isOptional: false
    },
    'responding-to-fraud': {
        title: 'Responding to Fraud',
        instruction: 'Ask the manager: What do you do when you find fraud?',
        isOptional: false
    }
};

// Regular interview recording questions
const regularRecordingQuestions = {
    'sound-check': {
        title: 'Sound Check (Optional)',
        instruction: 'Ask the contractor to speak into the microphone at a normal volume.',
        isOptional: true
    },
    'interview-quality': {
        title: 'Interview Quality Assessment',
        instruction: 'Ask the contractor: How do you ensure the quality of your interviews?',
        isOptional: false
    },
    'data-verification': {
        title: 'Data Verification',
        instruction: 'Ask the contractor: How do you verify the accuracy of the data you collect?',
        isOptional: false
    },
    'contractor-feedback': {
        title: 'Contractor Feedback',
        instruction: 'Ask the contractor: Do you have any feedback about the interview process?',
        isOptional: false
    }
};

// Management interview steps content
const managementInterviewSteps = {
    1: {
        title: "Manager Information",
        content: `
            <div class="question">
                <h3>Enter the manager's name:</h3>
                <div class="form-group">
                    <input type="text" class="input-field" id="manager-name" placeholder="">
                </div>
                
                <h3>Select the manager's role:</h3>
                <div class="radio-group">
                    <label class="radio-option" data-role="production">
                        <input type="radio" name="manager-role" value="production">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Production Manager</div>
                            <div class="radio-description">Responsible for operations, final quality assurance, and interview submission</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-role="data-entry">
                        <input type="radio" name="manager-role" value="data-entry">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Data Entry Manager</div>
                            <div class="radio-description">Responsible for quality of data entry into the pedigree entry tool</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-role="field">
                        <input type="radio" name="manager-role" value="field">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Field Manager</div>
                            <div class="radio-description">Responsible for quality of work done by interviewers</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-role="internal-auditor">
                        <input type="radio" name="manager-role" value="internal-auditor">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Internal Auditor</div>
                            <div class="radio-description">Responsible for internal quality control and auditing</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-role="other">
                        <input type="radio" name="manager-role" value="other">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Other role</div>
                            <div class="radio-description">Other role not covered by descriptions above</div>
                        </div>
                    </label>
                </div>
                
                <h3>FamilySearch username of manager</h3>
                <div class="form-group">
                    <input type="text" class="input-field" id="familysearch-username" placeholder="">
                </div>
            </div>
        `
    },
    2: {
        title: "Create interview recordings",
        content: `
            <div class="question">
                <h3>Create interview recordings.</h3>
                <div class="recording-tiles">
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Sound Check</div>
                            <div class="recording-subtitle">(optional)</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">FamilySearch Expectations</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Quality of Interviews</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Interview Fabrication</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Responding to Fraud</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    3: {
        title: "Manager Rating",
        content: `
            <div class="question">
                <h3>Manager Rating</h3>
                <p>Rate the manager's understanding of quality control processes.</p>
                
                <div class="radio-group">
                    <label class="radio-option" data-rating="very-limited">
                        <input type="radio" name="manager-rating" value="very-limited">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Very Limited</div>
                            <div class="radio-description">Unable to explain quality control and fraud prevention; answers are unclear.</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-rating="limited">
                        <input type="radio" name="manager-rating" value="limited">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Limited</div>
                            <div class="radio-description">Little understanding of quality control and fraud prevention; answers are uncertain.</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-rating="fair">
                        <input type="radio" name="manager-rating" value="fair">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Fair</div>
                            <div class="radio-description">Basic knowledge of quality control and fraud prevention; answers are partly clear.</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-rating="good">
                        <input type="radio" name="manager-rating" value="good">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Good</div>
                            <div class="radio-description">Clear understanding of quality control and fraud prevention; answers are reliable.</div>
                        </div>
                    </label>
                    
                    <label class="radio-option" data-rating="excellent">
                        <input type="radio" name="manager-rating" value="excellent">
                        <div class="radio-circle"></div>
                        <div class="radio-content">
                            <div class="radio-title">Excellent</div>
                            <div class="radio-description">Complete knowledge of quality control and fraud prevention; answers are precise.</div>
                        </div>
                    </label>
                </div>
            </div>
        `
    },
    4: {
        title: "Additional Information",
        content: `
            <div class="question">
                <h3>Additional information about your rating (optional):</h3>
                <div class="form-group">
                    <textarea class="input-field" id="additional-rating-info" placeholder="" rows="6"></textarea>
                </div>
            </div>
        `
    }
};

// Live interview steps content
const liveInterviewSteps = {
    1: {
        title: "Interview basics",
        content: `
            <div class="question">
                <div class="form-group">
                    <label>Interview ID</label>
                    <input type="text" class="input-field" id="interview-id" placeholder="Ex: GH_001_20250101_1111">
                </div>
                <div class="form-group">
                    <label>Interviewee's name</label>
                    <input type="text" class="input-field" id="interviewee-name" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label>How many interviewees provided names?</label>
                    <input type="number" class="input-field" id="interviewees-count" min="0" placeholder="Enter number">
                </div>
                <div class="form-group">
                    <label>How many hours did the interview take?</label>
                    <input type="number" class="input-field" id="interview-hours" min="0" step="0.5" placeholder="Enter hours">
                </div>
                <div class="form-group">
                    <label>How many names were collected?</label>
                    <input type="number" class="input-field" id="names-collected" min="0" placeholder="Enter number">
                </div>
                <div class="form-group">
                    <h3>Did the interviewer follow documented Quality Control process?</h3>
                    <div class="toggle-group" id="quality-control-toggle">
                        <button class="toggle-option" data-value="yes">Yes</button>
                        <button class="toggle-option" data-value="no">No</button>
                    </div>
                </div>
                <div class="form-group">
                    <h3>Were all the names provided from memory?</h3>
                    <div class="toggle-group" id="names-memory-toggle">
                        <button class="toggle-option" data-value="yes">Yes</button>
                        <button class="toggle-option" data-value="no">No</button>
                    </div>
                    <div id="names-memory-no-content" class="conditional-content hidden">
                        <div class="form-group">
                            <label>What document type was used to provide names?</label>
                            <input type="text" class="input-field" id="document-type" placeholder="Enter document type">
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    2: {
        title: "Interview photos",
        content: `
            <div class="question">
                <h3>Photos</h3>
                <div class="form-group">
                    <div class="photo-section">
                        <p><strong>You with the interviewee</strong></p>
                        <div class="photo-upload" data-photo="with-interviewee">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                    <div class="photo-section">
                        <p><strong>First page of Paper Collection Form</strong></p>
                        <div class="photo-upload" data-photo="first-page">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                    <div class="photo-section">
                        <p><strong>Last page of Paper Collection Form</strong></p>
                        <div class="photo-upload" data-photo="last-page">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    3: {
        title: "Additional info",
        content: `
            <div class="question">
                <div class="form-group">
                    <h3>Did you observe a full interview?</h3>
                    <div class="toggle-group" id="full-interview-toggle">
                        <button class="toggle-option" data-value="yes">Yes</button>
                        <button class="toggle-option" data-value="no">No</button>
                    </div>
                    <div id="full-interview-yes-content" class="conditional-content hidden">
                        <p><em>Interviewee provided all the names they know</em></p>
                    </div>
                    <div id="full-interview-no-content" class="conditional-content hidden">
                        <p><em>Interview will be finished later or is cancelled</em></p>
                    </div>
                </div>
                <div class="form-group">
                    <label>Additional information about interview (optional)</label>
                    <textarea class="input-field" id="additional-info" rows="4" placeholder="Enter additional information..."></textarea>
                </div>
            </div>
        `
    }
};

// Field interview steps content
const fieldInterviewSteps = {
    1: {
        title: "Meeting interviewee",
        content: `
            <div class="question">
                <h3>Did you meet the interviewee in person?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                <div id="yes-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Photos:</label>
                        <div class="photo-section">
                            <p><strong>You with the interviewee</strong></p>
                            <div class="photo-upload" data-photo="with-interviewee">
                                <div class="upload-icon">CAMERA_ICON</div>
                                <p>Add an image</p>
                            </div>
                        </div>
                        <div class="photo-section">
                            <p><strong>You in front of the interviewee's home</strong></p>
                            <div class="photo-upload" data-photo="front-of-home">
                                <div class="upload-icon">CAMERA_ICON</div>
                                <p>Add an image</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <h3>Was the interviewee able to sign a piece of paper?</h3>
                        <div class="toggle-group" id="signature-toggle">
                            <button class="toggle-option" data-value="yes">Yes</button>
                            <button class="toggle-option" data-value="no">No</button>
                        </div>
                        <div id="signature-yes-content" class="conditional-content hidden">
                            <div class="photo-section">
                                <p><strong>Interviewee's signature</strong></p>
                                <div class="photo-upload" data-photo="signature">
                                    <div class="upload-icon">CAMERA_ICON</div>
                                    <p>Add an image</p>
                                </div>
                            </div>
                            <h3>Does the interviewee's signature match the authorization form?</h3>
                            <div class="toggle-group" id="signature-match-toggle">
                                <button class="toggle-option" data-value="yes">Yes</button>
                                <button class="toggle-option" data-value="no">No</button>
                            </div>
                            <div id="signature-match-no-content" class="conditional-content hidden">
                                <label>Why do the signatures not match?</label>
                                <div class="radio-group">
                                    <label class="radio-option">
                                        <input type="radio" name="signature-mismatch" value="someone-else">
                                        <div class="radio-circle"></div>
                                        <div class="radio-content">Someone else signed the original form</div>
                                    </label>
                                    <label class="radio-option">
                                        <input type="radio" name="signature-mismatch" value="other">
                                        <div class="radio-circle"></div>
                                        <div class="radio-content">Other</div>
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label>Reason the signatures do not match:</label>
                                    <textarea class="input-field" rows="3" placeholder="Enter reason..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div id="signature-no-content" class="conditional-content hidden">
                            <label>Why was the interviewee unable to sign?</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="unable-to-sign" value="refused">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">Interviewee refused to sign</div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="unable-to-sign" value="cannot-write">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">Interviewee does not know how to write</div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="unable-to-sign" value="other">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">Other</div>
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Reason interviewee could not sign:</label>
                                <textarea class="input-field" rows="3" placeholder="Enter reason..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="no-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Why did you not meet the interviewee?</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="out-working">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Out working</div>
                                    <div class="radio-description">Interviewee was working when we were supposed to meet.</div>
                                </div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="out-of-town">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Out of town</div>
                                    <div class="radio-description">Interviewee was not in the area when we were supposed to meet.</div>
                                </div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="does-not-live-here">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Does not live here</div>
                                    <div class="radio-description">Interviewee was visiting during name collection or moved before the interview.</div>
                                </div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="home-not-found">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Home not found</div>
                                    <div class="radio-description">I was not able to find the interviewee's home.</div>
                                </div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="refused">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Refused to participate</div>
                                    <div class="radio-description">Interviewee would not help with the audit.</div>
                                </div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="not-met-reason" value="other">
                                <div class="radio-circle"></div>
                                <div class="radio-content">
                                    <div class="radio-title">Other</div>
                                    <div class="radio-description">Reason not listed above.</div>
                                </div>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Reason you did not meet the interviewee:</label>
                            <textarea class="input-field" rows="3" placeholder="Enter reason..."></textarea>
                        </div>
                    </div>
                    <div id="home-photo-section" class="form-group conditional-content hidden">
                        <label>Photos:</label>
                        <div class="photo-section">
                            <p><strong>You in front of the interviewee's home</strong></p>
                            <div class="photo-upload" data-photo="front-of-home-no-meet">
                                <div class="upload-icon">CAMERA_ICON</div>
                                <p>Add an image</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    2: {
        title: "Interviewee recordings",
        content: `
            <div class="question">
                <h3>Create interview recordings.</h3>
                <div class="recording-tiles">
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Sound Check</div>
                            <div class="recording-subtitle">(optional)</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Names from Page 5</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Names from Page 3</div>
                        </div>
                    </div>
                    
                    <div class="recording-tile">
                        <div class="recording-icon">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_20288_37039)">
                                    <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="#0072F0"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20288_37039">
                                        <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="recording-content">
                            <div class="recording-title">Immediate Family Names</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    3: {
        title: "Interview info",
        content: `
            <div class="question">
                <h3>Was the interviewee paid to provide names?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                
                <h3>Ask the interviewee how long the original interview took:</h3>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="interview-duration" value="less-than-1">
                        <div class="radio-circle"></div>
                        <div class="radio-content">Less than 1 hour</div>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="interview-duration" value="1-to-3">
                        <div class="radio-circle"></div>
                        <div class="radio-content">Between 1 and 3 hours</div>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="interview-duration" value="3-to-6">
                        <div class="radio-circle"></div>
                        <div class="radio-content">Between 3 and 6 hours</div>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="interview-duration" value="more-than-6">
                        <div class="radio-circle"></div>
                        <div class="radio-content">More than 6 hours</div>
                    </label>
                </div>
            </div>
        `
    },
    4: {
        title: "Family Booklet basics",
        content: `
            <div class="question">
                <h3>Was the family booklet available for you to inspect?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                <div id="yes-content" class="conditional-content hidden">
                    <div class="form-group">
                        <h3>Do you know the exact date the family booklet was delivered?</h3>
                        <div class="toggle-group" id="exact-date-toggle">
                            <button class="toggle-option" data-value="yes">Yes</button>
                            <button class="toggle-option" data-value="no">No</button>
                        </div>
                        <div id="exact-date-yes-content" class="conditional-content hidden">
                            <label>Enter the date when the family booklet was delivered:</label>
                            <input type="date" class="input-field" id="delivery-date">
                        </div>
                        <div id="exact-date-no-content" class="conditional-content hidden">
                            <label>Give your best guess of when the booklet was delivered:</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="delivery-guess" value="today">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">Today</div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="delivery-guess" value="few-days">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">A few days ago (1-6 days)</div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="delivery-guess" value="week-or-two">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">A week or two ago</div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="delivery-guess" value="more-than-two-weeks">
                                    <div class="radio-circle"></div>
                                    <div class="radio-content">More than two weeks ago</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <h3>Compare the ages of the interviewee's immediate family in the family booklet to the paper collection form. Do all the ages match?</h3>
                        <div class="toggle-group" id="ages-match-toggle">
                            <button class="toggle-option" data-value="yes">Yes</button>
                            <button class="toggle-option" data-value="no">No</button>
                        </div>
                        <div id="ages-match-no-content" class="conditional-content hidden">
                            <div class="form-group">
                                <label>How many immediate family members have ages that do not match?</label>
                                <input type="number" class="input-field" min="1" id="mismatched-count">
                            </div>
                            <div id="mismatched-names-container">
                                <!-- Dynamic content will be added here -->
                            </div>
                        </div>
                    </div>
                </div>
                <div id="no-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Why was the family booklet not available?</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="booklet-unavailable" value="not-delivered">
                                <div class="radio-circle"></div>
                                <div class="radio-content">Booklet was not delivered to the interviewee</div>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="booklet-unavailable" value="other">
                                <div class="radio-circle"></div>
                                <div class="radio-content">Other reason</div>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Explain why the family booklet was not available:</label>
                            <textarea class="input-field" rows="4" placeholder="Enter explanation..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    5: {
        title: "Family Booklet details",
        content: `
            <div class="question">
                <div class="form-group">
                    <label>How many people are listed on the paper collection form (number of RINs)?</label>
                    <input type="number" class="input-field" min="0" id="paper-form-count">
                </div>
                
                <div class="form-group">
                    <label>How many people are listed in the family booklet?</label>
                    <input type="number" class="input-field" min="0" id="family-booklet-count">
                </div>
                
                <div id="count-mismatch-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Names in family booklet not included on paper collection form:</label>
                        <textarea class="input-field" rows="3" placeholder="Enter names..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Names on paper collection form not included in family booklet:</label>
                        <textarea class="input-field" rows="3" placeholder="Enter names..."></textarea>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Photos of family booklet:</label>
                    <div class="photo-section">
                        <p><strong>First page of names</strong></p>
                        <div class="photo-upload" data-photo="first-page">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                    <div class="photo-section">
                        <p><strong>Last page of names</strong></p>
                        <div class="photo-upload" data-photo="last-page">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    6: {
        title: "Additional Information",
        content: `
            <div class="question">
                <h3>Additional information about interview (optional):</h3>
                <div class="form-group">
                    <textarea class="input-field" rows="6" placeholder="Enter any additional information about this interview..."></textarea>
                </div>
            </div>
        `
    }
};

// Interview steps content
const interviewSteps = {
    1: {
        title: "Paper Collection Form",
        content: `
            <div class="question">
                <h3>Does the contractor have the paper collection form for this interview?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                <div id="yes-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Number of paper collection form pages:</label>
                        <input type="number" class="input-field" min="1" id="page-count">
                    </div>
                    <div class="form-group">
                        <label>Photos of the paper collection form:</label>
                        <div class="photo-section">
                            <p><strong>Page 1</strong></p>
                            <div class="photo-upload" data-photo="page-1">
                                <div class="upload-icon">CAMERA_ICON</div>
                                <p>Add an image</p>
                            </div>
                        </div>
                        <div class="photo-section" id="last-page-section">
                            <p><strong>Page <span id="last-page-number">5</span></strong></p>
                            <div class="photo-upload" data-photo="page-last">
                                <div class="upload-icon">CAMERA_ICON</div>
                                <p>Add an image</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>How many people are listed on the paper collection form (number of RINS)?</label>
                        <input type="number" class="input-field" min="0" placeholder="Enter number of RINs">
                    </div>
                </div>
                <div id="no-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Explain why paper collection form was not available:</label>
                        <textarea class="input-field" rows="4" placeholder="Enter explanation..."></textarea>
                    </div>
                </div>
            </div>
        `
    },
    2: {
        title: "Authorization Form",
        content: `
            <div class="question">
                <h3>Does the contractor have the authorization form for this interview?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                <div id="yes-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Photo of authorization form:</label>
                        <div class="photo-upload">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                </div>
                <div id="no-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Explain why authorization form was not available:</label>
                        <textarea class="input-field" rows="4" placeholder="Enter explanation..."></textarea>
                    </div>
                </div>
            </div>
        `
    },
    3: {
        title: "QCP Checklist",
        content: `
            <div class="question">
                <h3>Does the contractor have the QCP checklist for this interview?</h3>
                <div class="toggle-group">
                    <button class="toggle-option" data-value="yes">Yes</button>
                    <button class="toggle-option" data-value="no">No</button>
                </div>
                <div id="yes-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Photo of QCP checklist:</label>
                        <div class="photo-upload">
                            <div class="upload-icon">CAMERA_ICON</div>
                            <p>Add an image</p>
                        </div>
                    </div>
                </div>
                <div id="no-content" class="conditional-content hidden">
                    <div class="form-group">
                        <label>Explain why checklist was not available:</label>
                        <textarea class="input-field" rows="4" placeholder="Enter explanation..."></textarea>
                    </div>
                </div>
            </div>
        `
    },
    4: {
        title: "Additional Information",
        content: `
            <div class="question">
                <h3>Additional information about this interview (optional):</h3>
                <div class="form-group">
                    <textarea class="input-field" rows="6" placeholder="The office fire affected several parts of the audit, but the contractor did his best to provide me with every document they still had."></textarea>
                </div>
            </div>
        `
    }
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const permissionButtons = document.querySelectorAll('[data-permission]');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalOk = document.getElementById('modal-ok');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    generateInterviewList();
    generateManagementInterviewList();
    generateFieldInterviewList();
    generateLiveInterviewList();
    generatePhoneCheckList();
    // Initialize task progress
    updateTaskProgress();
    updateManagementTaskProgress();
    updateFieldTaskProgress();
    // Clear any default content from interview screen
    const stepContentArea = document.getElementById('step-content-area');
    if (stepContentArea) {
        stepContentArea.innerHTML = '';
    }
    showScreen('work-order-screen'); // Skip login and permissions for demo
});

function setupEventListeners() {
    // Permission buttons
    permissionButtons.forEach(button => {
        button.addEventListener('click', handlePermission);
    });
    
    // Navigation buttons
    document.getElementById('close-permissions').addEventListener('click', () => showScreen('permissions-access-screen'));
    document.getElementById('go-to-settings').addEventListener('click', () => showScreen('permissions-access-screen'));
    document.getElementById('allow-access').addEventListener('click', () => showScreen('work-order-screen'));
    
    // Back buttons
    document.getElementById('back-to-main').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-work-order').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-interview-list').addEventListener('click', () => handleBackNavigation('office-interview-screen'));
    document.getElementById('back-to-work-order-from-management').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-management-list').addEventListener('click', () => handleBackNavigation('management-team-screen'));
    
    // Task navigation
    document.querySelectorAll('[data-task]').forEach(task => {
        task.addEventListener('click', handleTaskClick);
    });
    
    // Interview navigation
    document.getElementById('previous-step').addEventListener('click', () => navigateStep(-1));
    document.getElementById('next-step').addEventListener('click', () => navigateStep(1));
    document.getElementById('finish-interview').addEventListener('click', finishInterview);
    
    // Management interview navigation
    document.getElementById('add-management-interview').addEventListener('click', addManagementInterview);
    document.getElementById('previous-management-step').addEventListener('click', () => navigateManagementStep(-1));
    document.getElementById('next-management-step').addEventListener('click', () => navigateManagementStep(1));
    document.getElementById('finish-management-interview').addEventListener('click', finishManagementInterview);
    
    // Live interview navigation
    document.getElementById('add-live-interview').addEventListener('click', addLiveInterview);
    document.getElementById('previous-live-step').addEventListener('click', () => navigateLiveStep(-1));
    document.getElementById('next-live-step').addEventListener('click', () => navigateLiveStep(1));
    document.getElementById('finish-live-interview').addEventListener('click', finishLiveInterview);
    
    // Phone check navigation
    document.getElementById('add-phone-check').addEventListener('click', addPhoneCheck);
    document.getElementById('finish-phone-check').addEventListener('click', finishPhoneCheck);
    
    // Field interview navigation
    document.getElementById('back-to-work-order-from-field-tasks').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-field-tasks-from-interview').addEventListener('click', () => {
        handleBackNavigation('field-interview-tasks-screen');
    });
    document.getElementById('back-to-field-interviews').addEventListener('click', () => {
        handleBackNavigation('field-interview-tasks-screen');
    });
    document.getElementById('field-prev-step').addEventListener('click', prevFieldStep);
    document.getElementById('field-next-step').addEventListener('click', nextFieldStep);
    
    // Live interview back navigation
    document.getElementById('back-to-work-order-from-live').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-live-list').addEventListener('click', () => handleBackNavigation('live-interview-screen'));
    
    // Phone check back navigation
    document.getElementById('back-to-work-order-from-unfinished').addEventListener('click', () => handleBackNavigation('work-order-screen'));
    document.getElementById('back-to-phone-check-list').addEventListener('click', () => handleBackNavigation('unfinished-check-screen'));
    
    // Recording interface
    // Recording screen buttons (with null checks)
    const editBtn = document.getElementById('edit-recordings');
    const editManagementBtn = document.getElementById('edit-management-interviews');
    const editLiveBtn = document.getElementById('edit-live-interviews');
    const editPhoneCheckBtn = document.getElementById('edit-phone-checks');

    const backBtn = document.getElementById('back-to-management-step');
    const recordBtn = document.getElementById('record-btn');
    const playbackBtn = document.getElementById('playback-btn');
    const redoBtn = document.getElementById('redo-btn');
    const doneRecordingBtn = document.getElementById('done-recording');
    
    if (editBtn) editBtn.addEventListener('click', showManagementRecordingScreen);
    if (editManagementBtn) editManagementBtn.addEventListener('click', toggleManagementEditMode);
    if (editLiveBtn) editLiveBtn.addEventListener('click', toggleLiveEditMode);
    if (editPhoneCheckBtn) editPhoneCheckBtn.addEventListener('click', togglePhoneCheckEditMode);
    if (backBtn) backBtn.addEventListener('click', () => handleBackNavigation('individual-management-interview-screen'));
    if (recordBtn) recordBtn.addEventListener('click', toggleRecording);
    if (playbackBtn) playbackBtn.addEventListener('click', togglePlayback);
    if (redoBtn) redoBtn.addEventListener('click', redoRecording);
    if (doneRecordingBtn) doneRecordingBtn.addEventListener('click', () => {
        if (recordingState === 'completed') {
            // If recording is already completed, go back to management interview
            updateRecordingStatuses();
            showScreen('individual-management-interview-screen');
        } else if (currentRecordingKey === 'sound-check') {
            // For sound check, just go back to management interview
            updateRecordingStatuses();
            showScreen('individual-management-interview-screen');
        } else {
            // For regular recordings, complete them and then go back
            completeRecording();
            setTimeout(() => {
                updateRecordingStatuses();
                showScreen('individual-management-interview-screen');
            }, 500); // Small delay to show completion state briefly
        }
    });
    
    // Timeline slider for playback
    const timelineInput = document.getElementById('timeline-input');
    if (timelineInput) {
        timelineInput.addEventListener('input', (e) => {
            playbackTime = parseFloat(e.target.value);
            updatePlaybackTime();
        });
    }

    // Recording tile handlers for both management and field interviews
    document.addEventListener('click', (e) => {
        if (e.target.closest('.recording-tile')) {
            const tile = e.target.closest('.recording-tile');
            const recordingTitle = tile.querySelector('.recording-title').textContent;
            
            if (recordingTitle === 'Sound Check') {
                showSoundCheckRecording();
            }
            // Add other recording handlers here later
        }
    });

    // Sound Check screen handlers
    const soundCheckRecordBtn = document.getElementById('sound-check-record-btn');
    const backFromSoundCheck = document.getElementById('back-from-sound-check');
    const backFromGoodSoundCheck = document.getElementById('back-from-good-sound-check');
    const backFromBadSoundCheck = document.getElementById('back-from-bad-sound-check');
    const goodPlayBtn = document.getElementById('good-play-btn');
    const badPlayBtn = document.getElementById('bad-play-btn');
    const goodRedoBtn = document.getElementById('good-redo-btn');
    const badRedoBtn = document.getElementById('bad-redo-btn');
    const goodDoneBtn = document.getElementById('good-done-btn');
    const badDoneBtn = document.getElementById('bad-done-btn');

    if (soundCheckRecordBtn) soundCheckRecordBtn.addEventListener('click', toggleSoundCheckRecording);
    if (backFromSoundCheck) backFromSoundCheck.addEventListener('click', () => goBackFromSoundCheck());
    if (backFromGoodSoundCheck) backFromGoodSoundCheck.addEventListener('click', () => goBackFromSoundCheck());
    if (backFromBadSoundCheck) backFromBadSoundCheck.addEventListener('click', () => goBackFromSoundCheck());
    if (goodPlayBtn) goodPlayBtn.addEventListener('click', () => simulatePlayback('good'));
    if (badPlayBtn) badPlayBtn.addEventListener('click', () => simulatePlayback('bad'));
    if (goodRedoBtn) goodRedoBtn.addEventListener('click', () => redoSoundCheck());
    if (badRedoBtn) badRedoBtn.addEventListener('click', () => redoSoundCheck());
    if (goodDoneBtn) goodDoneBtn.addEventListener('click', () => completeSoundCheck());
    if (badDoneBtn) badDoneBtn.addEventListener('click', () => completeSoundCheck());

    // Recording screen item handlers
    document.querySelectorAll('#management-recording-screen .recording-item').forEach(item => {
        item.addEventListener('click', () => {
            const recordingKey = item.dataset.recording;
            startManagementRecording(recordingKey);
        });
    });

    document.querySelectorAll('#field-recording-screen .recording-item').forEach(item => {
        item.addEventListener('click', () => {
            const recordingKey = item.dataset.recording;
            startFieldRecording(recordingKey);
        });
    });

    // Recording screen navigation buttons
    const prevManagementRecording = document.getElementById('previous-management-recording');
    const nextManagementRecording = document.getElementById('next-management-recording');
    const prevFieldRecording = document.getElementById('previous-field-recording');
    const nextFieldRecording = document.getElementById('next-field-recording');

    if (prevManagementRecording) {
        prevManagementRecording.addEventListener('click', () => {
            navigateManagementStep(-1);
        });
    }

    if (nextManagementRecording) {
        nextManagementRecording.addEventListener('click', () => {
            navigateManagementStep(1);
        });
    }

    if (prevFieldRecording) {
        prevFieldRecording.addEventListener('click', () => {
            prevFieldStep();
        });
    }

    if (nextFieldRecording) {
        nextFieldRecording.addEventListener('click', () => {
            nextFieldStep();
        });
    }
    
    // Modal
    modalOk.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });
}

function showScreen(screenId) {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function handlePermission(e) {
    const permission = e.target.dataset.permission;
    const action = e.target.dataset.action;
    
    if (action === 'allow') {
        permissions[permission] = true;
    }
    
    // Check if all permissions are granted
    const allGranted = Object.values(permissions).every(p => p === true);
    const anyDenied = Object.values(permissions).some(p => p === false);
    
    if (allGranted) {
        showScreen('work-order-screen');
    } else if (anyDenied) {
        // Check if user has interacted with all permission types
        setTimeout(() => {
            showScreen('permissions-required-screen');
        }, 500);
    }
}

function handleTaskClick(e) {
    const task = e.currentTarget.dataset.task;
    
    switch (task) {
        case 'office-interview':
            showScreen('office-interview-screen');
            break;
        case 'management-team':
            showScreen('management-team-screen');
            break;
        case 'field-interview':
            startFieldInterview();
            break;
        case 'observe-live':
            showScreen('live-interview-screen');
            break;
        case 'unfinished-check':
            showScreen('unfinished-check-screen');
            break;
        case 'summary':
            showSummaryScreen();
            break;
    }
}

function generateInterviewList() {
    const interviewList = document.querySelector('.interview-list');
    if (!interviewList) return;
    
    interviewList.innerHTML = '';
    
    interviews.forEach((interview, index) => {
        const interviewItem = document.createElement('div');
        interviewItem.className = 'interview-item';
        interviewItem.dataset.interview = index;
        
        const progressText = interview.completed ? '4/4' : `${interview.filledSteps}/4`;
        const progressClass = interview.completed ? 'completed' : (interview.filledSteps > 0 ? 'partial' : '');
        
        // Calculate progress angle for partial progress (360 degrees = full circle)
        const progressAngle = interview.filledSteps > 0 && !interview.completed ? 
            Math.round((interview.filledSteps / interview.steps) * 360) : 90;
        
        interviewItem.innerHTML = `
            <div class="interview-info">
                <h3>Interview ${index + 1}</h3>
                <p>${interview.id}</p>
            </div>
            <div class="progress-circle ${progressClass}" style="--progress-angle: ${progressAngle}deg">
                <span>${progressText}</span>
            </div>
        `;
        
        interviewItem.addEventListener('click', () => {
            currentInterview = index;
            currentStep = 1;
            showScreen('individual-interview-screen');
            updateInterviewScreen();
        });
        
        interviewList.appendChild(interviewItem);
    });
}

function updateInterviewScreen() {
    const interview = interviews[currentInterview];
    const stepIndicator = document.getElementById('current-step');
    const interviewId = document.getElementById('interview-id');
    const stepContentArea = document.getElementById('step-content-area');
    const previousBtn = document.getElementById('previous-step');
    const nextBtn = document.getElementById('next-step');
    const finishBtn = document.getElementById('finish-interview');
    
    // Update step indicator
    stepIndicator.textContent = `Step ${currentStep} of ${interview.steps}`;
    
    // Update interview ID
    interviewId.textContent = interview.id;
    
    // Update step content
    if (interviewSteps[currentStep]) {
        stepContentArea.innerHTML = interviewSteps[currentStep].content;
        setupStepListeners();
        
        // Populate previously saved data
        populateInterviewStepData();
        
        // Initialize recording data and update statuses for step 2 (recordings step)
        if (currentStep === 2) {
            initializeRegularRecordings();
            updateRecordingStatuses();
        }
    }
    
    // Update navigation buttons
    previousBtn.style.display = currentStep > 1 ? 'block' : 'none';
    
    if (currentStep < interview.steps) {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    }
}

function populateInterviewStepData() {
    const interview = interviews[currentInterview];
    const stepData = interview.stepData[currentStep];
    
    if (!stepData) return;
    
    // Restore toggle selection
    if (stepData.hasToggle && stepData.toggleValue) {
        const toggleBtn = document.querySelector(`.toggle-option[data-value="${stepData.toggleValue}"]`);
        if (toggleBtn) {
            // Simulate click to restore state
            toggleBtn.click();
            
            // Restore form data after toggle is set
            setTimeout(() => {
                if (stepData.toggleValue === 'yes') {
                    if (currentStep === 1) {
                        const pageCountField = document.getElementById('page-count');
                        const rinsField = document.querySelector('#yes-content .input-field[type="number"]:last-of-type');
                        if (pageCountField && stepData.pageCount) pageCountField.value = stepData.pageCount;
                        if (rinsField && stepData.rinsCount) rinsField.value = stepData.rinsCount;
                    }
                } else if (stepData.toggleValue === 'no') {
                    const explanationField = document.querySelector('#no-content textarea');
                    if (explanationField && stepData.explanation) explanationField.value = stepData.explanation;
                }
                
                // For step 4, restore additional info
                if (currentStep === 4) {
                    const additionalField = document.querySelector('.input-field');
                    if (additionalField && stepData.additionalInfo) additionalField.value = stepData.additionalInfo;
                }
            }, 100);
        }
    }
}

function initializeRegularRecordings() {
    const interview = interviews[currentInterview];
    
    // Initialize recordings object if it doesn't exist
    if (!interview.recordings) {
        interview.recordings = {};
    }
    
    // Initialize each recording type for regular interviews
    const recordingTypes = ['sound-check', 'interview-quality', 'data-verification', 'contractor-feedback'];
    recordingTypes.forEach(type => {
        if (!interview.recordings[type]) {
            interview.recordings[type] = {
                completed: false,
                duration: 0
            };
        }
    });
}

function setupStepListeners() {
    // Replace camera icon placeholders with SVG
    const cameraIcons = document.querySelectorAll('.upload-icon');
    cameraIcons.forEach(icon => {
        if (icon.textContent === 'CAMERA_ICON') {
            icon.innerHTML = getCameraSVG();
        }
    });
    
    // Toggle buttons
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', handleToggleOption);
    });
    
    // Photo uploads
    const photoUploads = document.querySelectorAll('.photo-upload');
    photoUploads.forEach(upload => {
        upload.addEventListener('click', handlePhotoUpload);
    });
    
    // Page count input (for step 1)
    const pageCountInput = document.getElementById('page-count');
    if (pageCountInput) {
        pageCountInput.addEventListener('input', updateLastPageNumber);
        pageCountInput.addEventListener('input', clearValidationState);
    }
    
    // Add validation listeners to all input fields
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(field => {
        field.addEventListener('input', clearValidationState);
        field.addEventListener('blur', validateField);
    });

    // Recording item listeners
    const recordingItems = document.querySelectorAll('.recording-item');
    recordingItems.forEach(item => {
        // Use regular recording handler for regular interviews, field handler for field interviews
        if (currentScreen === 'interview-screen') {
            item.addEventListener('click', handleRecordingClick);
        } else {
            item.addEventListener('click', handleFieldRecordingClick);
        }
    });

    // Radio button listeners for field interviews
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', handleFieldRadioSelection);
    });
}

function initializeToggleGroups() {
    // Toggle buttons
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', handleToggleOption);
    });
}

function setupFieldStep1ConditionalContent() {
    // Field interview toggle handling is now done in the general handleToggleOption function
    
    // Handle the "not met" reason selection
    document.addEventListener('change', (event) => {
        if (event.target.name === 'not-met-reason' && currentScreen === 'field-interview-step-screen') {
            const homePhotoSection = document.getElementById('home-photo-section');
            if (homePhotoSection) {
                if (event.target.value !== 'home-not-found') {
                    homePhotoSection.classList.remove('hidden');
                } else {
                    homePhotoSection.classList.add('hidden');
                }
            }
        }
    });
}

function initializeNestedToggleGroups() {
    const nestedToggleGroups = document.querySelectorAll('#signature-toggle, #signature-match-toggle, #exact-date-toggle, #ages-match-toggle');
    
    nestedToggleGroups.forEach(toggleGroup => {
        const buttons = toggleGroup.querySelectorAll('.toggle-option');
        
        buttons.forEach(button => {
            // The nested toggle groups now use the main handleToggleOption function
            // This just ensures they are properly bound to the main handler
            button.addEventListener('click', handleToggleOption);
        });
    });
}

function handleToggleOption(e) {
    const toggleGroup = e.target.closest('.toggle-group');
    const toggleOptions = toggleGroup.querySelectorAll('.toggle-option');
    const value = e.target.dataset.value;
    
    // Remove active class from all options and reset text
    toggleOptions.forEach(option => {
        option.classList.remove('active');
        const originalText = option.dataset.value === 'yes' ? 'Yes' : 'No';
        option.textContent = originalText;
    });
    
    // Add active class to clicked option and add checkmark
    e.target.classList.add('active');
    if (value === 'yes') {
        e.target.textContent = '✓ Yes';
    } else {
        e.target.textContent = 'No';
    }
    
    // Handle field interview specific logic
    console.log(`Toggle clicked: currentScreen=${currentScreen}, currentFieldStep=${currentFieldStep}, value=${value}`); // Debug log
    if (currentScreen === 'field-interview-step-screen') {
        console.log(`Field interview toggle: currentFieldStep=${currentFieldStep}, value=${value}, toggleGroup:`, toggleGroup); // Debug log
        const interview = fieldInterviews[currentFieldInterview];
        
        if (currentFieldStep === 1) {
            // This is the main "Did you meet the interviewee in person?" question in step 1
            interview.metInPerson = value === 'yes';
            console.log(`Step 1: Set metInPerson = ${interview.metInPerson}`); // Debug log
        } else if (currentFieldStep === 4) {
            // This is the "Is the family booklet available?" question in step 4
            interview.bookletAvailable = value === 'yes';
            console.log(`Step 4: Set bookletAvailable = ${interview.bookletAvailable}`); // Debug log
        }
        
        // Immediately log the current state
        console.log(`Current interview state: metInPerson=${interview.metInPerson}, bookletAvailable=${interview.bookletAvailable}`);
    }
    
    // Show/hide conditional content
    // Check if this is a nested toggle group with specific IDs
    const groupId = toggleGroup.id;
    let yesContent, noContent;
    
    if (groupId === 'signature-toggle') {
        yesContent = document.getElementById('signature-yes-content');
        noContent = document.getElementById('signature-no-content');
    } else if (groupId === 'exact-date-toggle') {
        yesContent = document.getElementById('exact-date-yes-content');
        noContent = document.getElementById('exact-date-no-content');
    } else if (groupId === 'ages-match-toggle') {
        yesContent = document.getElementById('ages-match-yes-content');
        noContent = document.getElementById('ages-match-no-content');
    } else if (groupId === 'signature-match-toggle') {
        // This only has no-content
        noContent = document.getElementById('signature-match-no-content');
        if (value === 'no') {
            noContent?.classList.remove('hidden');
        } else {
            noContent?.classList.add('hidden');
        }
    } else if (groupId === 'names-memory-toggle') {
        // Live interview: Names from memory toggle
        noContent = document.getElementById('names-memory-no-content');
        if (value === 'no') {
            noContent?.classList.remove('hidden');
        } else {
            noContent?.classList.add('hidden');
        }
    } else if (groupId === 'full-interview-toggle') {
        // Live interview: Full interview toggle
        yesContent = document.getElementById('full-interview-yes-content');
        noContent = document.getElementById('full-interview-no-content');
    } else {
        // Default behavior for main toggle groups
        yesContent = document.getElementById('yes-content');
        noContent = document.getElementById('no-content');
    }
    
    if (yesContent && noContent) {
        if (value === 'yes') {
            yesContent.classList.remove('hidden');
            noContent.classList.add('hidden');
        } else {
            yesContent.classList.add('hidden');
            noContent.classList.remove('hidden');
        }
    } else if (yesContent || noContent) {
        // Handle cases where only one content area exists
        if (value === 'yes' && yesContent) {
            yesContent.classList.remove('hidden');
        } else if (value === 'no' && noContent) {
            noContent.classList.remove('hidden');
        }
        
        if (value === 'no' && yesContent) {
            yesContent.classList.add('hidden');
        } else if (value === 'yes' && noContent) {
            noContent.classList.add('hidden');
        }
    }
    
    // Update progress when user makes selection
    if (currentScreen === 'field-interview-step-screen') {
        updateFieldInterviewProgress();
    } else if (currentScreen === 'individual-live-interview-screen') {
        updateLiveProgress();
    } else {
        updateInterviewProgress();
    }
}

function handlePhotoUpload(e) {
    // Simulate photo capture for interactive prototype
    const uploadDiv = e.currentTarget;
    
    // Update to show a document thumbnail
    uploadDiv.innerHTML = `
        <div class="document-thumbnail">
            <div class="document-preview">
                <div class="document-lines"></div>
                <div class="document-lines"></div>
                <div class="document-lines"></div>
                <div class="document-lines"></div>
                <div class="document-lines"></div>
            </div>
            <button class="delete-btn">×</button>
        </div>
    `;
    uploadDiv.style.borderColor = '#4CAF50';
    uploadDiv.style.backgroundColor = '#f5fff5';
    uploadDiv.style.minHeight = '120px';
    
    // Add delete functionality
    const deleteBtn = uploadDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        // Reset to original state
        uploadDiv.innerHTML = `
            <div class="upload-icon">CAMERA_ICON</div>
            <p>Add an image</p>
        `;
        // Replace camera icon placeholder
        const uploadIcon = uploadDiv.querySelector('.upload-icon');
        uploadIcon.innerHTML = getCameraSVG();
        uploadDiv.style.borderColor = '#ccc';
        uploadDiv.style.backgroundColor = 'transparent';
        uploadDiv.style.minHeight = 'auto';
    });
}

function updateLastPageNumber() {
    const pageCountInput = document.getElementById('page-count');
    const lastPageNumber = document.getElementById('last-page-number');
    
    if (pageCountInput && lastPageNumber) {
        const pageCount = parseInt(pageCountInput.value) || 5;
        lastPageNumber.textContent = pageCount;
    }
}

function clearValidationState(e) {
    e.target.classList.remove('invalid', 'valid');
}

function validateField(e) {
    const field = e.target;
    if (field.value.trim()) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
    }
    
    // Update progress when user fills out fields
    updateInterviewProgress();
}

function navigateStep(direction) {
    const interview = interviews[currentInterview];
    const newStep = currentStep + direction;
    
    // Allow going back at any time
    if (direction < 0) {
        if (newStep >= 1 && newStep <= interview.steps) {
            currentStep = newStep;
            updateInterviewScreen();
            updateInterviewProgress(); // Update progress based on filled-out content
        }
        return;
    }
    
    // Validate current step before moving forward
    if (direction > 0 && !validateCurrentStep()) {
        showModal(
            'Information missing',
            'Some answers are missing or in the wrong format. Please fill out all fields correctly.',
            null,
            'VIEW ERRORS',
            'NEXT STEP'
        );
        return;
    }
    
    if (newStep >= 1 && newStep <= interview.steps) {
        currentStep = newStep;
        updateInterviewScreen();
        updateInterviewProgress(); // Update progress based on filled-out content
    }
}

function validateCurrentStep() {
    // Clear previous validation states
    document.querySelectorAll('.input-field').forEach(field => {
        field.classList.remove('invalid', 'valid');
    });
    
    // Check if a toggle option is selected
    const activeToggle = document.querySelector('.toggle-option.active');
    if (!activeToggle) {
        return false;
    }
    
    const selectedValue = activeToggle.dataset.value;
    let isValid = true;
    
    // Validate based on current step and selected option
    if (currentStep === 1) {
        if (selectedValue === 'yes') {
            // Check required fields for "yes" response
            const pageCountField = document.getElementById('page-count');
            const rinsCountField = document.querySelector('#yes-content .input-field[type="number"]:last-of-type');
            
            if (!pageCountField?.value) {
                pageCountField?.classList.add('invalid');
                isValid = false;
            } else {
                pageCountField?.classList.add('valid');
            }
            
            if (!rinsCountField?.value) {
                rinsCountField?.classList.add('invalid');
                isValid = false;
            } else {
                rinsCountField?.classList.add('valid');
            }
        } else if (selectedValue === 'no') {
            // Check explanation field for "no" response
            const explanationField = document.querySelector('#no-content textarea');
            if (!explanationField?.value || explanationField.value.trim() === '') {
                explanationField?.classList.add('invalid');
                isValid = false;
            } else {
                explanationField?.classList.add('valid');
            }
        }
    } else if (currentStep === 2 || currentStep === 3) {
        if (selectedValue === 'no') {
            // Check explanation field for "no" response
            const explanationField = document.querySelector('#no-content textarea');
            if (!explanationField?.value || explanationField.value.trim() === '') {
                explanationField?.classList.add('invalid');
                isValid = false;
            } else {
                explanationField?.classList.add('valid');
            }
        }
    }
    // Step 4 is optional, so always valid
    
    return isValid;
}

function finishInterview() {
    // Mark interview as completed
    interviews[currentInterview].completed = true;
    
    // Go back to interview list
    showScreen('office-interview-screen');
    generateInterviewList();
    
    // Update task progress
    updateTaskProgress();
}

function updateTaskProgress() {
    const completedInterviews = interviews.filter(i => i.completed).length;
    const progressCircle = document.querySelector('[data-task="office-interview"] .progress-circle');
    const progressSpan = progressCircle.querySelector('span');
    
    progressSpan.textContent = `${completedInterviews}/10`;
    
    // Remove existing progress classes
    progressCircle.classList.remove('completed', 'partial');
    
    if (completedInterviews === 10) {
        progressCircle.classList.add('completed');
    } else if (completedInterviews > 0) {
        progressCircle.classList.add('partial');
        // Calculate and set progress angle (360 degrees = full circle)
        const progressAngle = Math.round((completedInterviews / 10) * 360);
        progressCircle.style.setProperty('--progress-angle', `${progressAngle}deg`);
    }
    
    // Update submit button
    const submitBtn = document.getElementById('submit-audit');
    if (completedInterviews === 10) {
        submitBtn.disabled = false;
    }
    
    // Update live interview progress
    updateLiveInterviewTaskProgress();
    
    // Update phone check progress
    updateUnfinishedCheckTaskProgress();
}

function updateLiveInterviewTaskProgress() {
    const completedLiveInterviews = liveInterviews.filter(i => i.completed).length;
    const progressCircle = document.querySelector('[data-task="observe-live"] .progress-circle');
    
    if (progressCircle) {
        const progressSpan = progressCircle.querySelector('span');
        progressSpan.textContent = `${completedLiveInterviews}/1`;
        
        // Remove existing progress classes
        progressCircle.classList.remove('completed', 'partial');
        
        if (completedLiveInterviews >= 1) {
            progressCircle.classList.add('completed');
        } else if (liveInterviews.length > 0) {
            // Show partial progress if there are interviews in progress
            const hasProgress = liveInterviews.some(i => i.filledSteps > 0);
            if (hasProgress) {
                progressCircle.classList.add('partial');
                // Set progress based on highest completion
                const maxProgress = Math.max(...liveInterviews.map(i => i.filledSteps / i.steps));
                const progressAngle = Math.round(maxProgress * 360);
                progressCircle.style.setProperty('--progress-angle', `${progressAngle}deg`);
            }
        }
    }
}

function saveCurrentStepData() {
    const interview = interviews[currentInterview];
    const stepData = interview.stepData[currentStep] || {};
    
    // Save toggle selection
    const activeToggle = document.querySelector('.toggle-option.active');
    stepData.hasToggle = !!activeToggle;
    stepData.toggleValue = activeToggle?.dataset.value || '';
    
    if (stepData.toggleValue === 'yes') {
        // Save "yes" path data
        if (currentStep === 1) {
            stepData.pageCount = document.getElementById('page-count')?.value || '';
            stepData.rinsCount = document.querySelector('#yes-content .input-field[type="number"]:last-of-type')?.value || '';
            stepData.hasPhotos = document.querySelectorAll('#yes-content .document-thumbnail').length > 0;
        } else if (currentStep === 2 || currentStep === 3) {
            stepData.hasPhotos = document.querySelectorAll('#yes-content .document-thumbnail').length > 0;
        }
    } else if (stepData.toggleValue === 'no') {
        // Save "no" path data
        stepData.explanation = document.querySelector('#no-content textarea')?.value || '';
    }
    
    // Save optional additional information for step 4
    if (currentStep === 4) {
        stepData.additionalInfo = document.querySelector('.input-field')?.value || '';
    }
    
    interview.stepData[currentStep] = stepData;
}

function isInterviewStepComplete(stepNumber) {
    const interview = interviews[currentInterview];
    const stepData = interview.stepData[stepNumber];
    
    if (!stepData || !stepData.hasToggle) return false;
    
    if (stepNumber === 4) {
        // Step 4 is optional, so having any data (even empty) counts as complete
        return true;
    }
    
    if (stepData.toggleValue === 'yes') {
        if (stepNumber === 1) {
            // Step 1 "yes" requires: page count, RINs count, and photos
            return stepData.pageCount && stepData.pageCount !== '' &&
                   stepData.rinsCount && stepData.rinsCount !== '' &&
                   stepData.hasPhotos;
        } else if (stepNumber === 2 || stepNumber === 3) {
            // Steps 2-3 "yes" requires: photos
            return stepData.hasPhotos;
        }
    } else if (stepData.toggleValue === 'no') {
        // "No" path requires explanation
        return stepData.explanation && stepData.explanation.trim() !== '';
    }
    
    return false;
}

function updateInterviewProgress() {
    const interview = interviews[currentInterview];
    
    // Save current step data
    saveCurrentStepData();
    
    // Count completed steps by checking each step's requirements
    let filledSteps = 0;
    
    for (let step = 1; step <= interview.steps; step++) {
        if (isInterviewStepComplete(step)) {
            filledSteps = step;
        } else {
            // If any step is not complete, we can't count subsequent steps
            break;
        }
    }
    
    // Update the interview's filled steps
    interview.filledSteps = filledSteps;
    
    // Update the interview progress in the list
    generateInterviewList();
}



function showModal(title, message, onConfirm, cancelText = 'Cancel', confirmText = 'Confirm') {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
    
    // Check if this is the "Information missing" modal that should have two buttons
    if (title === 'Information missing') {
        // Create two-button layout for Information missing modal
        const modalButtons = document.querySelector('.modal-buttons');
        modalButtons.innerHTML = `
            <button class="btn-secondary" id="modal-cancel">${cancelText}</button>
            <button class="btn-primary" id="modal-confirm">${confirmText}</button>
        `;
        
        // Add event listeners
        document.getElementById('modal-cancel').addEventListener('click', hideModal);
        document.getElementById('modal-confirm').addEventListener('click', () => {
            hideModal();
            if (onConfirm) {
                onConfirm();
            } else if (confirmText === 'NEXT STEP') {
                // Allow bypassing validation errors
                // Check if we're in management interviews, field interviews, or regular interviews
                const managementScreen = document.getElementById('individual-management-interview-screen');
                const fieldScreen = document.getElementById('field-interview-step-screen');
                
                if (managementScreen && managementScreen.classList.contains('active')) {
                    // Management interview navigation
                    const interview = managementInterviews[currentManagementInterview];
                    const newStep = currentManagementStep + 1;
                    if (newStep <= interview.steps) {
                        currentManagementStep = newStep;
                        updateManagementInterviewScreen();
                        updateManagementProgress();
                    }
                } else if (fieldScreen && fieldScreen.classList.contains('active')) {
                    // Field interview navigation
                    const interview = fieldInterviews[currentFieldInterview];
                    
                    if (currentFieldStep < 6) {
                        currentFieldStep++;
                        showFieldInterviewStep();
                    } else {
                        // "Finish Interview" button should do exactly what the back button does
                        handleBackNavigation('field-interview-tasks-screen');
                    }
                } else if (currentScreen === 'individual-live-interview-screen') {
                    // Live interview navigation
                    const interview = liveInterviews[currentLiveInterview];
                    const newStep = currentLiveStep + 1;
                    if (newStep <= interview.steps) {
                        currentLiveStep = newStep;
                        updateLiveInterviewScreen();
                        updateLiveProgress();
                    }
                } else {
                    // Regular interview navigation
                    const interview = interviews[currentInterview];
                    const newStep = currentStep + 1;
                    if (newStep <= interview.steps) {
                        currentStep = newStep;
                        updateInterviewScreen();
                        updateInterviewProgress();
                    }
                }
            }
        });
    } else {
        // Keep single OK button for other modals (like Feature Not Implemented)
        const modalButtons = document.querySelector('.modal-buttons');
        modalButtons.innerHTML = `
            <button class="btn-primary" id="modal-ok">OK</button>
        `;
        
        document.getElementById('modal-ok').addEventListener('click', () => {
            hideModal();
            if (onConfirm) {
                onConfirm();
            }
        });
    }
}

function hideModal() {
    modalOverlay.classList.remove('active');
}

function showNotImplementedModal(feature) {
    showModal(
        'Feature Not Implemented',
        `${feature} functionality will be implemented in the full version of the app.`
    );
}

// Field Interview Recording Content
const fieldRecordingQuestions = {
    'sound-check': {
        title: 'Sound Check (optional)',
        instruction: 'Ask interviewee to speak into microphone at normal volume'
    },
    'names-from-last-page': {
        title: 'Names from Page 5',
        instruction: 'Record the interviewee confirming random names from the last page of paper collection form'
    },
    'names-from-random-page': {
        title: `Names from Page ${Math.floor(Math.random() * 5) + 1}`,
        instruction: 'Record the interviewee confirming random names from a random page of the paper collection form'
    },
    'immediate-family-names': {
        title: 'Immediate Family Names',
        instruction: 'Record the interviewee providing names of immediate family members'
    }
};

const fieldRecordingDetails = {
    'sound-check': {
        title: 'Sound Check',
        steps: [
            {
                title: 'Before pressing Start',
                content: 'Ask manager to speak into microphone at normal volume',
                isPreStep: true
            },
            {
                title: 'After pressing Start',
                content: 'Speak into microphone at normal volume',
                hasRecording: true
            }
        ]
    },
    'names-from-last-page': {
        title: 'Names from Last Page',
        steps: [
            {
                title: 'Recording Instructions',
                content: 'Record the interviewee confirming random names from the last page of paper collection form.',
                hasRecording: true
            }
        ]
    },
    'names-from-random-page': {
        title: 'Names from Random Page',
        steps: [
            {
                title: 'Recording Instructions',
                content: 'Record the interviewee confirming random names from a random page of paper collection form.',
                hasRecording: true
            }
        ]
    },
    'immediate-family-names': {
        title: 'Immediate Family Names',
        steps: [
            {
                title: 'Recording Instructions',
                content: 'Record the interviewee confirming the names and ages of the interviewee\'s immediate family.',
                hasRecording: true
            },
            {
                title: 'Follow-up Questions',
                content: `
                    <div class="form-group">
                        <label>Which names did the interviewee confirm?</label>
                        <div id="family-members-container">
                            <!-- Dynamic content will be added here -->
                        </div>
                        <button type="button" class="secondary-button" onclick="addFamilyMember()">Add Family Member</button>
                    </div>
                `,
                isFollowUp: true
            }
        ]
    }
};

// Management Team Interview Functions
function addManagementInterview() {
    // Create new management interview
    const newInterview = {
        id: `manager_${Date.now()}`,
        completed: false,
        steps: 4,
        filledSteps: 0,
        name: '',
        role: '',
        familySearchUsername: '',
        recordings: {
            'sound-check': { completed: false, optional: true, title: 'Sound Check' },
            'familysearch-expectations': { completed: false, optional: false, title: 'FamilySearch Expectations' },
            'quality-of-interviews': { completed: false, optional: false, title: 'Quality of Interviews' },
            'interview-fabrication': { completed: false, optional: false, title: 'Interview Fabrication' },
            'responding-to-fraud': { completed: false, optional: false, title: 'Responding to Fraud' }
        }
    };
    
    managementInterviews.push(newInterview);
    currentManagementInterview = managementInterviews.length - 1;
    currentManagementStep = 1;
    
    showScreen('individual-management-interview-screen');
    updateManagementInterviewScreen();
    generateManagementInterviewList();
}

function generateManagementInterviewList() {
    const managementList = document.querySelector('.management-interview-list');
    const emptyState = document.getElementById('management-empty-state');
    const floatingBtn = document.querySelector('.floating-plus-btn');
    const editBtn = document.getElementById('edit-management-interviews');
    
    if (!managementList) return;
    
    managementList.innerHTML = '';
    
    // Show/hide edit button based on whether there are interviews
    if (editBtn) {
        editBtn.style.display = managementInterviews.length > 0 ? 'block' : 'none';
    }
    
    if (managementInterviews.length === 0) {
        emptyState.style.display = 'block';
        floatingBtn.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        // Show floating button only if less than 4 interviews
        floatingBtn.style.display = managementInterviews.length < 4 ? 'flex' : 'none';
        
        // Check if we're in edit mode
        const isEditMode = editBtn && editBtn.textContent === 'Done';
        
        managementInterviews.forEach((interview, index) => {
            const interviewItem = document.createElement('div');
            interviewItem.className = 'interview-item';
            interviewItem.dataset.interview = index;
            
            if (isEditMode) {
                interviewItem.classList.add('edit-mode');
            }
            
            const progressText = interview.completed ? '4/4' : `${interview.filledSteps}/4`;
            const progressClass = interview.completed ? 'completed' : (interview.filledSteps > 0 ? 'partial' : '');
            const displayName = interview.name || `Manager Interview ${index + 1}`;
            
            let deleteButton = '';
            if (isEditMode) {
                deleteButton = `
                    <button class="delete-interview-btn" onclick="deleteManagementInterview(${index}); event.stopPropagation();">
                        <svg width="24" height="24" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7437 8.25V5.25H13.7437V8.25H4.74365V11.25H31.7437V8.25H22.7437ZM10.7437 15.75H25.7437V30.75H10.7437V15.75ZM7.74365 30.75C7.74365 31.5456 8.05972 32.3087 8.62233 32.8713C9.18494 33.4339 9.948 33.75 10.7437 33.75H25.7437C26.5393 33.75 27.3024 33.4339 27.865 32.8713C28.4276 32.3087 28.7437 31.5456 28.7437 30.75V12.75H7.74365V30.75ZM13.7437 27.75H16.7437V18.75H13.7437V27.75ZM19.7437 27.75H22.7437V18.75H19.7437V27.75Z" fill="#656666"/>
                        </svg>
                    </button>
                `;
            }
            
            // Calculate progress angle for partial progress (360 degrees = full circle)
            const progressAngle = interview.filledSteps > 0 && !interview.completed ? 
                Math.round((interview.filledSteps / interview.steps) * 360) : 90;
            
            interviewItem.innerHTML = `
                <div class="interview-info">
                    <h3>${displayName}</h3>
                    <p>${interview.role || 'Role not selected'}</p>
                </div>
                <div class="progress-circle ${progressClass}" style="--progress-angle: ${progressAngle}deg">
                    <span>${progressText}</span>
                </div>
                ${deleteButton}
            `;
            
            // Only add click listener if not in edit mode
            if (!isEditMode) {
                interviewItem.addEventListener('click', () => {
                    currentManagementInterview = index;
                    currentManagementStep = 1;
                    showScreen('individual-management-interview-screen');
                    updateManagementInterviewScreen();
                });
            }
            
            managementList.appendChild(interviewItem);
        });
    }
}

function updateManagementInterviewScreen() {
    const interview = managementInterviews[currentManagementInterview];
    const stepIndicator = document.getElementById('current-management-step');
    const interviewId = document.getElementById('management-interview-id');
    const stepContentArea = document.getElementById('management-step-content-area');
    const previousBtn = document.getElementById('previous-management-step');
    const nextBtn = document.getElementById('next-management-step');
    const finishBtn = document.getElementById('finish-management-interview');
    const editBtn = document.getElementById('edit-recordings');
    
    // Update step indicator
    stepIndicator.textContent = `Step ${currentManagementStep} of ${interview.steps}`;
    
    // Update interview ID
    const displayName = interview.name || `Manager Interview ${currentManagementInterview + 1}`;
    interviewId.textContent = displayName;
    
    // Show/hide edit button based on step
    editBtn.style.display = currentManagementStep === 2 ? 'block' : 'none';
    
    // Update step content
    if (managementInterviewSteps[currentManagementStep]) {
        stepContentArea.innerHTML = managementInterviewSteps[currentManagementStep].content;
        setupManagementStepListeners();
        
        // Populate form fields based on step
        populateManagementStepData();
        
        // Update recording statuses if on step 2
        if (currentManagementStep === 2) {
            updateRecordingStatuses();
        }
    }
    
    // Update navigation buttons
    previousBtn.style.display = currentManagementStep > 1 ? 'block' : 'none';
    
    if (currentManagementStep < interview.steps) {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    }
}

function setupManagementStepListeners() {
    // Radio button listeners
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', handleRadioSelection);
    });
    
    // Input field listeners
    const inputFields = document.querySelectorAll('#management-step-content-area .input-field');
    inputFields.forEach(field => {
        field.addEventListener('input', updateManagementProgress);
        field.addEventListener('blur', validateField);
    });
    
    // Recording item listeners
    const recordingItems = document.querySelectorAll('.recording-item');
    recordingItems.forEach(item => {
        item.addEventListener('click', handleRecordingClick);
    });
}

function populateManagementStepData() {
    const interview = managementInterviews[currentManagementInterview];
    
    if (currentManagementStep === 1) {
        // Step 1: Manager Information
        const managerNameField = document.getElementById('manager-name');
        const familySearchUsernameField = document.getElementById('familysearch-username');
        
        if (managerNameField && interview.name) {
            managerNameField.value = interview.name;
        }
        
        if (familySearchUsernameField && interview.familySearchUsername) {
            familySearchUsernameField.value = interview.familySearchUsername;
        }
        
        // Select the correct role radio button
        if (interview.role) {
            const roleValue = Object.keys(getRoleMap()).find(key => getRoleMap()[key] === interview.role);
            if (roleValue) {
                const roleRadio = document.querySelector(`input[name="manager-role"][value="${roleValue}"]`);
                const roleOption = document.querySelector(`[data-role="${roleValue}"]`);
                if (roleRadio && roleOption) {
                    roleRadio.checked = true;
                    roleOption.classList.add('selected');
                }
            }
        }
    } else if (currentManagementStep === 3) {
        // Step 3: Manager Rating
        if (interview.managerRating) {
            const ratingRadio = document.querySelector(`input[name="manager-rating"][value="${interview.managerRating}"]`);
            const ratingOption = document.querySelector(`[data-rating="${interview.managerRating}"]`);
            if (ratingRadio && ratingOption) {
                ratingRadio.checked = true;
                ratingOption.classList.add('selected');
            }
        }
    } else if (currentManagementStep === 4) {
        // Step 4: Additional Information
        const additionalInfoField = document.getElementById('additional-rating-info');
        if (additionalInfoField && interview.additionalRatingInfo) {
            additionalInfoField.value = interview.additionalRatingInfo;
        }
    }
}

function getRoleMap() {
    return {
        'production': 'Production Manager',
        'data-entry': 'Data Entry Manager',
        'field': 'Field Manager',
        'internal-auditor': 'Internal Auditor',
        'other': 'Other role'
    };
}

function handleRadioSelection(e) {
    const radioOption = e.currentTarget;
    const radioGroup = radioOption.closest('.radio-group');
    const radioInput = radioOption.querySelector('input[type="radio"]');
    
    // Remove selected class from all options in this group
    radioGroup.querySelectorAll('.radio-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    radioOption.classList.add('selected');
    radioInput.checked = true;
    
    // Update management progress
    updateManagementProgress();
}

function navigateManagementStep(direction) {
    const interview = managementInterviews[currentManagementInterview];
    const newStep = currentManagementStep + direction;
    
    // Allow going back at any time
    if (direction < 0) {
        if (newStep >= 1 && newStep <= interview.steps) {
            currentManagementStep = newStep;
            updateManagementInterviewScreen();
            updateManagementProgress();
        }
        return;
    }
    
    // Validate current step before moving forward
    if (direction > 0 && !validateCurrentManagementStep()) {
        showModal(
            'Information missing',
            'Some answers are missing or in the wrong format. Please fill out all fields correctly.',
            null,
            'VIEW ERRORS',
            'NEXT STEP'
        );
        return;
    }
    
    // Allow moving forward
    if (newStep >= 1 && newStep <= interview.steps) {
        currentManagementStep = newStep;
        updateManagementInterviewScreen();
        updateManagementProgress();
    }
}

function validateCurrentManagementStep() {
    // Clear previous validation states
    document.querySelectorAll('.input-field').forEach(field => {
        field.classList.remove('invalid', 'valid');
    });
    
    // Clear previous recording validation states
    const recordingItems = document.querySelectorAll('.recording-item');
    recordingItems.forEach(item => {
        item.classList.remove('missing');
        const statusDiv = item.querySelector('.recording-status');
        const recording = item.dataset.recording;
        const interview = managementInterviews[currentManagementInterview];
        
        // Reset status to normal state if not completed
        if (interview && interview.recordings && !interview.recordings[recording]?.completed) {
            statusDiv.innerHTML = '';
        }
    });
    
    let isValid = true;
    
    if (currentManagementStep === 1) {
        // Validate Step 1: Manager Information
        const nameField = document.getElementById('manager-name');
        const selectedRole = document.querySelector('input[name="manager-role"]:checked');
        const familySearchUsernameField = document.getElementById('familysearch-username');
        
        // Validate name field
        if (!nameField?.value || nameField.value.trim() === '') {
            nameField?.classList.add('invalid');
            isValid = false;
        } else {
            nameField?.classList.add('valid');
        }
        
        // Validate role selection
        if (!selectedRole) {
            isValid = false;
        }
        
        // Validate FamilySearch username
        if (!familySearchUsernameField?.value || familySearchUsernameField.value.trim() === '') {
            familySearchUsernameField?.classList.add('invalid');
            isValid = false;
        } else {
            familySearchUsernameField?.classList.add('valid');
        }
    } else if (currentManagementStep === 2) {
        // Validate Step 2: Recordings
        const interview = managementInterviews[currentManagementInterview];
        const requiredRecordings = Object.keys(interview.recordings).filter(key => !interview.recordings[key].optional);
        const completedRequired = requiredRecordings.filter(key => interview.recordings[key].completed);
        
        isValid = completedRequired.length === requiredRecordings.length;
        
        // Show validation errors for missing recordings
        if (!isValid) {
            const missingRecordings = getMissingRecordings();
            showRecordingValidationErrors(missingRecordings);
        }
    } else if (currentManagementStep === 3) {
        // Validate Step 3: Manager Rating
        const selectedRating = document.querySelector('input[name="manager-rating"]:checked');
        isValid = !!selectedRating;
    }
    // Step 4 is optional, so no validation needed
    
    return isValid;
}

function getMissingRecordings() {
    const interview = managementInterviews[currentManagementInterview];
    const missing = [];
    
    Object.keys(interview.recordings).forEach(recordingKey => {
        const recording = interview.recordings[recordingKey];
        if (!recording.completed && !recording.optional) {
            missing.push(recordingKey);
        }
    });
    
    return missing;
}

function showRecordingValidationErrors(missingRecordings) {
    // Update recording items to show missing status
    missingRecordings.forEach(recordingKey => {
        const recordingItem = document.querySelector(`[data-recording="${recordingKey}"]`);
        if (recordingItem) {
            recordingItem.classList.add('missing');
            const statusDiv = recordingItem.querySelector('.recording-status');
            statusDiv.innerHTML = '<span class="status-badge missing">! Missing</span>';
        }
    });
}

function updateRecordingStatuses() {
    // Determine which interview data to use based on current context
    let interview;
    if (currentScreen === 'individual-management-interview-screen' || managementInterviews.length > 0) {
        interview = managementInterviews[currentManagementInterview];
    } else {
        interview = interviews[currentInterview];
    }
    
    if (!interview) {
        console.log('No interview data found');
        return;
    }
    
    Object.keys(interview.recordings).forEach(recordingKey => {
        const recordingItem = document.querySelector(`[data-recording="${recordingKey}"]`);
        const recording = interview.recordings[recordingKey];
        
        if (recordingItem) {
            const statusDiv = recordingItem.querySelector('.recording-status');
            const iconDiv = recordingItem.querySelector('.recording-icon');
            
            recordingItem.classList.remove('completed', 'missing');
            
            if (recording.completed) {
                recordingItem.classList.add('completed');
                iconDiv.innerHTML = '▶';
                statusDiv.innerHTML = ''; // Office Interview should not show "Done" label
                
                // Add delete button for edit mode
                const existingDeleteBtn = statusDiv.querySelector('.delete-recording-btn');
                if (!existingDeleteBtn) {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-recording-btn';
                    deleteBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7437 8.25V5.25H13.7437V8.25H4.74365V11.25H31.7437V8.25H22.7437ZM10.7437 15.75H25.7437V30.75H10.7437V15.75ZM7.74365 30.75C7.74365 31.5456 8.05972 32.3087 8.62233 32.8713C9.18494 33.4339 9.948 33.75 10.7437 33.75H25.7437C26.5393 33.75 27.3024 33.4339 27.865 32.8713C28.4276 32.3087 28.7437 31.5456 28.7437 30.75V12.75H7.74365V30.75ZM13.7437 27.75H16.7437V18.75H13.7437V27.75ZM19.7437 27.75H22.7437V18.75H19.7437V27.75Z" fill="#656666"/>
                        </svg>
                    `;
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteRecording(recordingKey);
                    });
                    statusDiv.appendChild(deleteBtn);
                }
            } else {
                iconDiv.innerHTML = '';
                statusDiv.innerHTML = '';
            }
        }
    });
}

function handleRecordingClick(e) {
    // Don't navigate if clicking delete button
    if (e.target.classList.contains('delete-recording-btn')) {
        return;
    }
    
    const recordingKey = e.currentTarget.dataset.recording;
    let interview, isCompleted;
    
    // Determine which interview type we're in
    if (currentScreen === 'individual-management-interview-screen' || managementInterviews.length > 0) {
        interview = managementInterviews[currentManagementInterview];
    } else if (currentScreen === 'interview-screen') {
        interview = interviews[currentInterview];
    }
    
    isCompleted = interview && interview.recordings && interview.recordings[recordingKey] && interview.recordings[recordingKey].completed;
    
    if (isCompleted && recordingKey === 'sound-check') {
        // For completed sound check, show the playback screen (good or bad quality)
        showCompletedSoundCheck();
    } else if (isCompleted) {
        // Show playback screen for other completed recordings
        showPlaybackScreen(recordingKey);
    } else {
        // Start recording for incomplete recordings
        if (recordingKey === 'sound-check') {
            showSoundCheckRecording();
        } else {
            startRecording(recordingKey);
        }
    }
}

function showPlaybackScreen(recordingKey) {
    // Get the appropriate questions based on interview type
    const questionData = currentScreen === 'management-interview' 
        ? recordingQuestions[recordingKey] 
        : regularRecordingQuestions[recordingKey];
    currentRecordingKey = recordingKey;
    
    // Update recording screen for playback mode
    document.getElementById('recording-title').textContent = questionData.title;
    document.getElementById('recording-instruction').textContent = questionData.instruction;
    
    // Set to completed state to show playback controls
    recordingState = 'completed';
    isPlaybackMode = true; // Flag that we're in playback viewing mode
    
    const interview = currentScreen === 'management-interview' 
        ? managementInterviews[currentManagementInterview]
        : interviews[currentInterview];
    recordingTime = interview.recordings[recordingKey].duration || (recordingKey === 'sound-check' ? 10 : 0);
    playbackTime = 0;
    
    // Hide sound quality feedback for non-sound-check recordings in playback mode
    const feedback = document.getElementById('sound-quality-feedback');
    if (feedback) {
        feedback.style.display = 'none'; // Always hide in playback mode
    }
    
    updateRecordingUI();
    showScreen('recording-screen');
}

function showManagementRecordingScreen() {
    // Update the screen with current management interview data
    const interview = managementInterviews[currentManagementInterview];
    const displayName = interview.name || `Manager Interview ${currentManagementInterview + 1}`;
    
    document.getElementById('management-recording-interview-name').textContent = displayName;
    document.getElementById('management-recording-step').textContent = `Step ${currentManagementStep} of ${interview.steps}`;
    
    // Initialize recording statuses
    updateManagementRecordingStatuses();
    
    // Show the screen
    showScreen('management-recording-screen');
}

function showFieldRecordingScreen() {
    // Update the screen with current field interview data
    const interview = fieldInterviews[currentFieldInterview];
    const displayName = interview.intervieweeName || `Interview ${currentFieldInterview + 1}`;
    
    document.getElementById('field-recording-interview-name').textContent = displayName;
    document.getElementById('field-recording-step').textContent = `Step ${currentFieldStep} of 6`;
    
    // Initialize recording statuses
    updateFieldRecordingStatuses();
    
    // Show the screen
    showScreen('field-recording-screen');
    
    // Update Field Interview recording card titles by directly targeting DOM elements
    setTimeout(() => {
        // Find all recording items in the field recording screen
        const fieldRecordingItems = document.querySelectorAll('#field-recording-screen .recording-item');
        
        fieldRecordingItems.forEach((item, index) => {
            const titleElement = item.querySelector('.recording-title');
            if (titleElement) {
                switch (index) {
                    case 0: // Sound Check
                        titleElement.textContent = 'Sound Check (optional)';
                        break;
                    case 1: // Names from Last Page
                        titleElement.textContent = 'Names from Page 5';
                        break;
                    case 2: // Names from Random Page
                        const randomPage = Math.floor(Math.random() * 5) + 1;
                        titleElement.textContent = `Names from Page ${randomPage}`;
                        break;
                    case 3: // Immediate Family Names
                        titleElement.textContent = 'Immediate Family Names';
                        break;
                }
            }
        });
        
        // Also target by data-recording attribute as backup
        const soundCheckTitle = document.querySelector('[data-recording="sound-check"] .recording-title');
        if (soundCheckTitle) soundCheckTitle.textContent = 'Sound Check (optional)';
        
        const lastPageTitle = document.querySelector('[data-recording="names-from-last-page"] .recording-title');
        if (lastPageTitle) lastPageTitle.textContent = 'Names from Page 5';
        
        const randomPageTitle = document.querySelector('[data-recording="names-from-random-page"] .recording-title');
        if (randomPageTitle) {
            const randomPage = Math.floor(Math.random() * 5) + 1;
            randomPageTitle.textContent = `Names from Page ${randomPage}`;
        }
        
        const familyTitle = document.querySelector('[data-recording="immediate-family-names"] .recording-title');
        if (familyTitle) familyTitle.textContent = 'Immediate Family Names';
        
    }, 100); // Small delay to ensure DOM is rendered
}

function updateManagementRecordingStatuses() {
    const interview = managementInterviews[currentManagementInterview];
    const recordingItems = document.querySelectorAll('#management-recording-screen .recording-item');
    
    recordingItems.forEach(item => {
        const recordingKey = item.dataset.recording;
        const recording = interview.recordings[recordingKey];
        const statusElement = item.querySelector('.recording-status');
        const iconElement = item.querySelector('.recording-icon');
        
        if (recording.completed) {
            statusElement.innerHTML = '<span class="status-done">Done</span>';
            
            // Change icon to play icon for completed Sound Check
            if (recordingKey === 'sound-check' && iconElement) {
                iconElement.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="5,3 19,12 5,21" fill="white"/>
                    </svg>
                `;
            }
        } else {
            statusElement.innerHTML = '';
            
            // Reset to original microphone icon for incomplete Sound Check
            if (recordingKey === 'sound-check' && iconElement) {
                iconElement.innerHTML = `
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_20288_37039)">
                            <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_20288_37039">
                                <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
            }
        }
    });
}

function updateFieldRecordingStatuses() {
    const interview = fieldInterviews[currentFieldInterview];
    const recordingItems = document.querySelectorAll('#field-recording-screen .recording-item');
    
    recordingItems.forEach(item => {
        const recordingKey = item.dataset.recording;
        const recording = interview.recordings[recordingKey];
        const statusElement = item.querySelector('.recording-status');
        const iconElement = item.querySelector('.recording-icon');
        
        if (recording.completed) {
            statusElement.innerHTML = '<span class="status-done">Done</span>';
            
            // Change icon to play icon for completed Sound Check
            if (recordingKey === 'sound-check' && iconElement) {
                iconElement.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="5,3 19,12 5,21" fill="white"/>
                    </svg>
                `;
            }
        } else if (recording.attempted) {
            statusElement.innerHTML = '<span class="status-missing">Missing</span>';
        } else {
            statusElement.innerHTML = '';
            
            // Reset to original microphone icon for incomplete Sound Check
            if (recordingKey === 'sound-check' && iconElement) {
                iconElement.innerHTML = `
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_20288_37039)">
                            <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_20288_37039">
                                <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
            }
        }
    });
}

function startManagementRecording(recordingKey) {
    const interview = managementInterviews[currentManagementInterview];
    
    // Set the current recording key and initialize recording state
    currentRecordingKey = recordingKey;
    recordingState = 'ready';
    playbackState = 'stopped';
    recordingTime = 0;
    playbackTime = 0;
    
    // Update recording display
    document.getElementById('recording-title').textContent = 
        interview.recordings[recordingKey].title;
    
    updateRecordingUI();
    showScreen('recording-screen');
}

function startFieldRecording(recordingKey) {
    const interview = fieldInterviews[currentFieldInterview];
    
    // Set the current recording key and initialize recording state
    currentRecordingKey = recordingKey;
    recordingState = 'ready';
    playbackState = 'stopped';
    recordingTime = 0;
    playbackTime = 0;
    
    // Update recording display
    document.getElementById('recording-title').textContent = 
        interview.recordings[recordingKey].title;
    
    updateRecordingUI();
    showScreen('recording-screen');
}

// Sound Check functionality
let soundCheckTimer = null;
let soundCheckSeconds = 10;
let soundCheckState = 'ready'; // ready, recording, paused, completed
let lastScreen = null; // Track which screen we came from

function showSoundCheckRecording() {
    // Remember which screen we came from
    lastScreen = currentScreen;
    
    // Reset sound check state
    soundCheckSeconds = 10;
    soundCheckState = 'ready';
    updateSoundCheckTimer();
    updateSoundCheckButton();
    
    showScreen('sound-check-recording-screen');
}

function toggleSoundCheckRecording() {
    if (soundCheckState === 'ready') {
        startSoundCheckRecording();
    } else if (soundCheckState === 'recording') {
        pauseSoundCheckRecording();
    } else if (soundCheckState === 'paused') {
        resumeSoundCheckRecording();
    }
}

function startSoundCheckRecording() {
    soundCheckState = 'recording';
    updateSoundCheckButton();
    
    soundCheckTimer = setInterval(() => {
        soundCheckSeconds--;
        updateSoundCheckTimer();
        
        if (soundCheckSeconds <= 0) {
            completeSoundCheckRecording();
        }
    }, 1000);
}

function pauseSoundCheckRecording() {
    soundCheckState = 'paused';
    updateSoundCheckButton();
    
    if (soundCheckTimer) {
        clearInterval(soundCheckTimer);
        soundCheckTimer = null;
    }
}

function resumeSoundCheckRecording() {
    soundCheckState = 'recording';
    updateSoundCheckButton();
    
    soundCheckTimer = setInterval(() => {
        soundCheckSeconds--;
        updateSoundCheckTimer();
        
        if (soundCheckSeconds <= 0) {
            completeSoundCheckRecording();
        }
    }, 1000);
}

function completeSoundCheckRecording() {
    soundCheckState = 'completed';
    
    if (soundCheckTimer) {
        clearInterval(soundCheckTimer);
        soundCheckTimer = null;
    }
    
    // Reset playback state
    resetPlaybackState();
    
    // Randomly show good or bad quality screen
    const showGoodQuality = Math.random() > 0.5;
    if (showGoodQuality) {
        showScreen('sound-check-good-screen');
        setTimeout(() => {
            initializeScrubberInteraction('good');
        }, 100);
    } else {
        showScreen('sound-check-bad-screen');
        setTimeout(() => {
            initializeScrubberInteraction('bad');
        }, 100);
    }
}

function updateSoundCheckTimer() {
    const timerElement = document.getElementById('sound-check-timer');
    const minutes = Math.floor(soundCheckSeconds / 60);
    const seconds = soundCheckSeconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateSoundCheckButton() {
    const btn = document.getElementById('sound-check-record-btn');
    const label = document.getElementById('sound-check-record-label');
    
    btn.classList.remove('recording', 'paused');
    
    switch (soundCheckState) {
        case 'ready':
            label.textContent = 'Start';
            // Set microphone icon for ready state
            btn.innerHTML = `
                <svg width="38" height="38" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_20288_37039)">
                        <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_20288_37039">
                            <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            `;
            break;
        case 'recording':
            btn.classList.add('recording');
            label.textContent = 'Pause';
            // Update button icon to pause icon
            btn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="4" height="16" fill="white"/>
                    <rect x="14" y="4" width="4" height="16" fill="white"/>
                </svg>
            `;
            break;
        case 'paused':
            btn.classList.add('paused');
            label.textContent = 'Resume';
            // Update button icon back to microphone
            btn.innerHTML = `
                <svg width="38" height="38" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_20288_37039)">
                        <path d="M9.36523 11C10.6102 11 11.6152 9.995 11.6152 8.75V4.25C11.6152 3.005 10.6102 2 9.36523 2C8.12023 2 7.11523 3.005 7.11523 4.25V8.75C7.11523 9.995 8.12023 11 9.36523 11ZM8.61523 4.25C8.61523 3.8375 8.95273 3.5 9.36523 3.5C9.77773 3.5 10.1152 3.8375 10.1152 4.25V8.75C10.1152 9.1625 9.77773 9.5 9.36523 9.5C8.95273 9.5 8.61523 9.1625 8.61523 8.75V4.25ZM13.1152 8.75C13.1152 10.82 11.4352 12.5 9.36523 12.5C7.29523 12.5 5.61523 10.82 5.61523 8.75H4.11523C4.11523 11.3975 6.07273 13.5725 8.61523 13.94V16.25H10.1152V13.94C12.6577 13.5725 14.6152 11.3975 14.6152 8.75H13.1152V8.75Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_20288_37039">
                            <rect width="18" height="18" fill="white" transform="translate(0.365234 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            `;
            break;
    }
}

// Sound Check playback functionality
let playbackTimer = null;
let playbackProgress = 0; // 0 to 10 seconds
let isPlaybackActive = false;
let currentQuality = null;

function simulatePlayback(quality) {
    console.log('simulatePlayback called with quality:', quality, 'isPlaybackActive:', isPlaybackActive); // Debug log
    
    currentQuality = quality;
    const playBtn = document.getElementById(`${quality}-play-btn`);
    const scrubberCircle = document.querySelector(`#sound-check-${quality}-screen circle`);
    const timeStart = document.querySelector(`#sound-check-${quality}-screen .time-start`);
    
    console.log('simulatePlayback elements found - playBtn:', !!playBtn, 'scrubberCircle:', !!scrubberCircle, 'timeStart:', !!timeStart); // Debug log
    
    if (isPlaybackActive) {
        // Pause playback
        console.log('Pausing playback'); // Debug log
        pausePlayback(quality);
    } else {
        // Start playback
        console.log('Starting playback'); // Debug log
        startPlayback(quality);
    }
}

function startPlayback(quality) {
    console.log('startPlayback called with quality:', quality); // Debug log
    
    isPlaybackActive = true;
    currentQuality = quality;
    const playBtn = document.getElementById(`${quality}-play-btn`);
    
    console.log('Play button found:', !!playBtn); // Debug log
    
    // Clear any existing timer first
    if (playbackTimer) {
        console.log('Clearing existing timer'); // Debug log
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
    
    // Reset playback progress to start from beginning
    playbackProgress = 0;
    console.log('Reset playbackProgress to:', playbackProgress); // Debug log
    
    // Change play button to pause icon
    playBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" fill="white"/>
            <rect x="14" y="4" width="4" height="16" fill="white"/>
        </svg>
    `;
    
    // Update label
    document.querySelector(`#sound-check-${quality}-screen .play-label`).textContent = 'Pause';
    
    // Initialize display immediately
    updatePlaybackDisplay(quality);
    
    // Start timer - increment progress and update display every 100ms
    playbackTimer = setInterval(() => {
        playbackProgress += 0.1;
        console.log('Timer tick:', playbackProgress); // Debug log
        
        if (playbackProgress >= 10) {
            playbackProgress = 10;
            console.log('Playback completed at:', playbackProgress); // Debug log
            updatePlaybackDisplay(quality);
            pausePlayback(quality);
            return;
        }
        
        // Update display on every tick for smooth movement
        updatePlaybackDisplay(quality);
    }, 100);
}

function pausePlayback(quality) {
    isPlaybackActive = false;
    const playBtn = document.getElementById(`${quality}-play-btn`);
    
    // Clear timer
    if (playbackTimer) {
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
    
    // Change pause button back to play icon
    playBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,3 19,12 5,21" fill="white"/>
        </svg>
    `;
    
    // Update label
    document.querySelector(`#sound-check-${quality}-screen .play-label`).textContent = 'Play';
    
    // If playback completed (reached the end), reset to beginning for next play
    if (playbackProgress >= 10) {
        setTimeout(() => {
            playbackProgress = 0;
            updatePlaybackDisplay(quality);
        }, 500); // Small delay before resetting
    }
}

function updatePlaybackDisplay(quality) {
    console.log('Updating display, progress:', playbackProgress, 'quality:', quality); // Debug log
    
    const timeStart = document.querySelector(`#sound-check-${quality}-screen .time-start`);
    const scrubberCircle = document.querySelector(`#sound-check-${quality}-screen circle`);
    
    console.log('Elements found - timeStart:', !!timeStart, 'scrubberCircle:', !!scrubberCircle); // Debug log
    
    // Update time display
    const minutes = Math.floor(playbackProgress / 60);
    const seconds = Math.floor(playbackProgress % 60);
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeStart) {
        timeStart.textContent = timeString;
        console.log('Time updated to:', timeString); // Debug log
    }
    
    // Update scrubber position
    if (scrubberCircle) {
        const progress = Math.max(0, Math.min(1, playbackProgress / 10));
        // Based on the HTML: line goes from x1="28.4531" to x2="161.621"
        // Circle starts at cx="16.1211" (left of line start)
        const lineStartX = 28.4531;
        const lineEndX = 161.621;
        const lineWidth = lineEndX - lineStartX;
        const newX = lineStartX + (lineWidth * progress);
        
        console.log('Scrubber calculation - progress:', progress, 'newX:', newX); // Debug log
        scrubberCircle.setAttribute('cx', newX.toString());
        console.log('Scrubber position set to cx:', newX); // Debug log
    } else {
        console.warn('Scrubber circle not found for quality:', quality); // Debug log
    }
}

function initializeScrubberInteraction(quality) {
    const scrubberContainer = document.querySelector(`#sound-check-${quality}-screen .scrubber-container`);
    
    console.log('initializeScrubberInteraction - container found:', !!scrubberContainer); // Debug log
    
    if (!scrubberContainer) {
        return;
    }
    
    let isDragging = false;
    
    scrubberContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleScrubberInteraction(e, quality);
    });
    
    scrubberContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleScrubberInteraction(e.touches[0], quality);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            handleScrubberInteraction(e, quality);
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            handleScrubberInteraction(e.touches[0], quality);
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (isPlaybackActive && !playbackTimer) {
                startPlayback(quality);
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            if (isPlaybackActive && !playbackTimer) {
                startPlayback(quality);
            }
        }
    });
}

function handleScrubberInteraction(event, quality) {
    console.log('handleScrubberInteraction called, isPlaybackActive:', isPlaybackActive);
    
    // Pause playback during dragging
    if (isPlaybackActive) {
        console.log('Pausing playback for scrubber interaction');
        pausePlaybackOnly();
    }
    
    const scrubberContainer = document.querySelector(`#sound-check-${quality}-screen .scrubber-container`);
    if (!scrubberContainer) {
        console.warn('Scrubber container not found for interaction');
        return;
    }
    
    const rect = scrubberContainer.getBoundingClientRect();
    const containerWidth = rect.width;
    const clickX = event.clientX - rect.left;
    
    console.log(`Scrubber interaction - containerWidth: ${containerWidth}, clickX: ${clickX}`);
    
    // Calculate progress (0 to 1)
    const progress = Math.max(0, Math.min(1, clickX / containerWidth));
    const newProgress = progress * 10; // Convert to seconds (0 to 10)
    
    console.log(`Setting playbackProgress from ${playbackProgress} to ${newProgress}`);
    playbackProgress = newProgress;
    
    updatePlaybackDisplay(quality);
}

function pausePlaybackOnly() {
    // Pause without changing button state (used during dragging)
    if (playbackTimer) {
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
}



function resetPlaybackState() {
    // Reset all playback variables
    if (playbackTimer) {
        clearInterval(playbackTimer);
        playbackTimer = null;
    }
    playbackProgress = 0;
    isPlaybackActive = false;
    
    // Reset scrubber position and time display for both quality screens
    if (currentQuality) {
        updatePlaybackDisplay(currentQuality);
    }
    
    currentQuality = null;
}

function showCompletedSoundCheck() {
    // Remember which screen we came from
    lastScreen = currentScreen;
    
    // Reset playback state
    resetPlaybackState();
    
    // Randomly show good or bad quality screen (same as original completion)
    const showGoodQuality = Math.random() > 0.5;
    if (showGoodQuality) {
        showScreen('sound-check-good-screen');
        setTimeout(() => {
            initializeScrubberInteraction('good');
        }, 100);
    } else {
        showScreen('sound-check-bad-screen');
        setTimeout(() => {
            initializeScrubberInteraction('bad');
        }, 100);
    }
}

function redoSoundCheck() {
    // Reset sound check state completely
    soundCheckSeconds = 10;
    soundCheckState = 'ready';
    
    // Reset playback state
    resetPlaybackState();
    
    // Show the recording screen
    showSoundCheckRecording();
}

function completeSoundCheck() {
    // Mark sound check as completed in the current interview data
    if (lastScreen && lastScreen.includes('management')) {
        const interview = managementInterviews[currentManagementInterview];
        if (interview && interview.recordings && interview.recordings['sound-check']) {
            interview.recordings['sound-check'].completed = true;
        }
    } else if (lastScreen && lastScreen.includes('field')) {
        const interview = fieldInterviews[currentFieldInterview];
        if (interview && interview.recordings && interview.recordings['sound-check']) {
            interview.recordings['sound-check'].completed = true;
        }
    }
    
    // Reset playback state
    resetPlaybackState();
    
    goBackFromSoundCheck();
}

function goBackFromSoundCheck() {
    // Clean up timer if still running
    if (soundCheckTimer) {
        clearInterval(soundCheckTimer);
        soundCheckTimer = null;
    }
    
    // Go back to the screen we came from
    if (lastScreen) {
        showScreen(lastScreen);
        // Update the recording statuses to show completion
        if (lastScreen && lastScreen.includes('management')) {
            updateManagementInterviewScreen();
            // Force update of recording statuses with a small delay
            setTimeout(() => {
                updateRecordingStatuses();
            }, 100);
        } else if (lastScreen && lastScreen.includes('field')) {
            showFieldInterviewStep();
            // Force update of field recording statuses
            setTimeout(() => {
                if (currentFieldStep === 2) {
                    initializeFieldRecordingStep();
                }
            }, 100);
        }
    }
}

function startRecording(recordingKey) {
    // Get the appropriate questions based on interview type
    const questionData = currentScreen === 'management-interview' 
        ? recordingQuestions[recordingKey] 
        : regularRecordingQuestions[recordingKey];
    currentRecordingKey = recordingKey;
    isPlaybackMode = false; // Reset playback mode flag
    
    // Update recording screen
    document.getElementById('recording-title').textContent = questionData.title;
    document.getElementById('recording-instruction').textContent = questionData.instruction;
    
    // Hide sound quality feedback for non-sound-check recordings
    const feedback = document.getElementById('sound-quality-feedback');
    if (feedback && recordingKey !== 'sound-check') {
        feedback.style.display = 'none';
    }
    
    // Check if this recording is already completed
    const interview = managementInterviews[currentManagementInterview];
    if (interview && interview.recordings && interview.recordings[recordingKey] && interview.recordings[recordingKey].completed) {
        // Show completed state
        recordingState = 'completed';
        if (recordingKey === 'sound-check') {
            recordingTime = 10; // Already recorded 10 seconds
            playbackTime = 0; // Reset playback for sound check
        } else {
            recordingTime = interview.recordings[recordingKey].duration || 0;
            playbackTime = 0; // Regular recordings don't use playback
        }
    } else {
        // Reset recording state for new recording
        recordingState = 'ready';
        if (recordingKey === 'sound-check') {
            recordingTime = 10; // Start from 10 seconds for countdown
        } else {
            recordingTime = 0; // Start from 0 for count up
        }
        playbackTime = 0;
    }
    
    updateRecordingUI();
    
    showScreen('recording-screen');
}

// Recording state management
let recordingState = 'ready'; // ready, recording, paused, completed
let recordingTime = 0;
let recordingInterval = null;
let currentRecordingKey = null;
let playbackInterval = null;
let playbackTime = 0;
let isPlaying = false;
let isPlaybackMode = false; // New flag to distinguish playback viewing from recording completion

function toggleRecording() {
    switch (recordingState) {
        case 'ready':
        case 'paused':
            startRecordingTimer();
            break;
        case 'recording':
            pauseRecording();
            break;
    }
}

function startRecordingTimer() {
    recordingState = 'recording';
    recordingInterval = setInterval(() => {
        if (currentRecordingKey === 'sound-check') {
            recordingTime--; // Countdown for sound check
            if (recordingTime <= 0) {
                recordingTime = 0;
                completeRecording();
            }
        } else {
            recordingTime++; // Count up for other recordings - no auto-stop
        }
        updateRecordingUI();
    }, 1000);
    updateRecordingUI();
}

function pauseRecording() {
    recordingState = 'paused';
    clearInterval(recordingInterval);
    updateRecordingUI();
}

function completeRecording() {
    recordingState = 'completed';
    clearInterval(recordingInterval);
    
    // Mark recording as complete and save duration
    const interview = currentScreen === 'management-interview' 
        ? managementInterviews[currentManagementInterview]
        : interviews[currentInterview];
    interview.recordings[currentRecordingKey].completed = true;
    interview.recordings[currentRecordingKey].duration = currentRecordingKey === 'sound-check' ? 10 : recordingTime;
    
    updateRecordingUI();
    
    // Update progress for the appropriate interview type
    if (currentScreen === 'management-interview') {
        updateManagementProgress();
    } else {
        updateInterviewProgress();
    }
    
    // For sound check, show quality feedback immediately
    if (currentRecordingKey === 'sound-check') {
        showSoundQualityFeedback();
    } else {
        // For other recordings, return after delay
        setTimeout(() => {
            updateRecordingStatuses();
            showScreen('individual-management-interview-screen');
        }, 1500);
    }
}

function redoRecording() {
    recordingState = 'ready';
    if (currentRecordingKey === 'sound-check') {
        recordingTime = 10; // Reset to 10 seconds for countdown
    } else {
        recordingTime = 0; // Reset to 0 for count up
    }
    playbackTime = 0;
    clearInterval(recordingInterval);
    clearInterval(playbackInterval);
    stopPlayback();
    
    // Mark recording as incomplete
    const interview = managementInterviews[currentManagementInterview];
    if (interview && interview.recordings && interview.recordings[currentRecordingKey]) {
        interview.recordings[currentRecordingKey].completed = false;
        interview.recordings[currentRecordingKey].duration = 0;
    }
    
    // Hide sound quality feedback for sound check
    if (currentRecordingKey === 'sound-check') {
        const feedback = document.getElementById('sound-quality-feedback');
        if (feedback) feedback.style.display = 'none';
    }
    
    updateRecordingUI();
    updateManagementProgress();
}

function togglePlayback() {
    const playbackBtn = document.getElementById('playback-btn');
    const playbackIcon = document.getElementById('playback-icon');
    const playbackLabel = document.getElementById('playback-btn-label');
    
    if (!isPlaying) {
        // Start playback
        isPlaying = true;
        if (playbackIcon) playbackIcon.textContent = '⏸';
        if (playbackLabel) playbackLabel.textContent = 'Pause';
        
        playbackInterval = setInterval(() => {
            playbackTime += 0.1;
            const maxTime = currentRecordingKey === 'sound-check' ? 10 : recordingTime;
            if (playbackTime >= maxTime) {
                playbackTime = maxTime;
                stopPlayback();
            }
            updatePlaybackTime();
        }, 100);
    } else {
        // Pause playback
        stopPlayback();
    }
}

function stopPlayback() {
    isPlaying = false;
    clearInterval(playbackInterval);
    const playbackIcon = document.getElementById('playback-icon');
    const playbackLabel = document.getElementById('playback-btn-label');
    if (playbackIcon) playbackIcon.textContent = '▶';
    if (playbackLabel) playbackLabel.textContent = 'Play';
}

function updatePlaybackTime() {
    const timelineInput = document.getElementById('timeline-input');
    const currentTimeEl = document.getElementById('current-time');
    
    if (timelineInput) timelineInput.value = playbackTime;
    if (currentTimeEl) {
        const minutes = Math.floor(playbackTime / 60).toString().padStart(2, '0');
        const seconds = Math.floor(playbackTime % 60).toString().padStart(2, '0');
        currentTimeEl.textContent = `${minutes}:${seconds}`;
    }
}

function showSoundQualityFeedback() {
    const feedback = document.getElementById('sound-quality-feedback');
    const message = document.getElementById('quality-message');
    const instruction = document.getElementById('quality-instruction');
    
    // Simulate random quality check result
    const isGoodQuality = Math.random() > 0.3;
    
    feedback.style.display = 'block';
    feedback.className = `sound-quality-feedback ${isGoodQuality ? 'good' : 'bad'}`;
    
    if (isGoodQuality) {
        message.textContent = 'Sound quality is good!';
        instruction.style.display = 'none';
    } else {
        message.textContent = 'Bad sound quality';
        instruction.textContent = 'Check microphone settings.';
        instruction.style.display = 'block';
    }
}

function updateRecordingUI() {
    const timerEl = document.getElementById('recording-timer');
    const recordBtn = document.getElementById('record-btn');
    const recordIcon = document.getElementById('record-icon');
    const recordLabel = document.getElementById('record-btn-label');
    const playbackSection = document.getElementById('playback-section');
    const doneBtn = document.getElementById('done-recording');
    const timelineInput = document.getElementById('timeline-input');
    const totalTimeEl = document.getElementById('total-time');
    
    if (!timerEl || !recordBtn || !recordIcon || !recordLabel) {
        return;
    }
    
    // Update timer
    const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
    const seconds = (recordingTime % 60).toString().padStart(2, '0');
    timerEl.textContent = `${minutes}:${seconds}`;
    
    // Update timeline max value and total time
    if (timelineInput) {
        if (currentRecordingKey === 'sound-check') {
            timelineInput.max = 10; // Sound check is always 10 seconds
            if (totalTimeEl) totalTimeEl.textContent = '00:10';
        } else {
            timelineInput.max = recordingTime;
            if (totalTimeEl) {
                const totalMinutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
                const totalSeconds = (recordingTime % 60).toString().padStart(2, '0');
                totalTimeEl.textContent = `${totalMinutes}:${totalSeconds}`;
            }
        }
        timelineInput.value = 0;
        playbackTime = 0;
    }
    
    // Update record button
    recordBtn.className = 'record-btn';
    switch (recordingState) {
        case 'ready':
            // Show the record button and label again
            recordBtn.style.display = 'block';
            recordLabel.style.display = 'block';
            recordIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.623 30.9023C26.2143 30.9023 27.7405 30.2702 28.8657 29.145C29.9909 28.0198 30.623 26.4936 30.623 24.9023V12.9023C30.623 11.311 29.9909 9.78492 28.8657 8.6597C27.7405 7.53448 26.2143 6.90234 24.623 6.90234C23.0317 6.90234 21.5056 7.53448 20.3804 8.6597C19.2552 9.78492 18.623 11.311 18.623 12.9023V24.9023C18.623 26.4936 19.2552 28.0198 20.3804 29.145C21.5056 30.2702 23.0317 30.9023 24.623 30.9023ZM22.623 12.9023C22.623 12.3719 22.8338 11.8632 23.2088 11.4881C23.5839 11.1131 24.0926 10.9023 24.623 10.9023C25.1535 10.9023 25.6622 11.1131 26.0373 11.4881C26.4123 11.8632 26.623 12.3719 26.623 12.9023V24.9023C26.623 25.4328 26.4123 25.9415 26.0373 26.3166C25.6622 26.6916 25.1535 26.9023 24.623 26.9023C24.0926 26.9023 23.5839 26.6916 23.2088 26.3166C22.8338 25.9415 22.623 25.4328 22.623 24.9023V12.9023ZM24.623 34.9023C27.2752 34.9023 29.8188 33.8488 31.6941 31.9734C33.5695 30.098 34.623 27.5545 34.623 24.9023H38.623C38.6191 28.266 37.4042 31.5159 35.2007 34.0573C32.9971 36.5987 29.9522 38.2618 26.623 38.7423V44.9023H22.623V38.7423C19.2939 38.2618 16.249 36.5987 14.0454 34.0573C11.8419 31.5159 10.627 28.266 10.623 24.9023H14.623C14.623 27.5545 15.6766 30.098 17.552 31.9734C19.4273 33.8488 21.9709 34.9023 24.623 34.9023V34.9023Z" fill="currentColor"/>
                </svg>
            `;
            recordLabel.textContent = 'Start';
            if (playbackSection) playbackSection.style.display = 'none';
            if (doneBtn) {
                doneBtn.style.display = 'none';
                doneBtn.innerHTML = 'Done'; // Reset to default text
            }
            
            // Show instruction text again when ready
            const instructionEl = document.getElementById('recording-instruction');
            if (instructionEl) instructionEl.style.display = 'block';
            break;
        case 'recording':
            recordBtn.classList.add('recording');
            recordIcon.innerHTML = '⏸';
            recordLabel.textContent = 'Pause';
            if (playbackSection) playbackSection.style.display = 'none';
            
            // For regular recordings, show Done button during recording
            if (currentRecordingKey === 'sound-check') {
                if (doneBtn) doneBtn.style.display = 'none';
            } else {
                if (doneBtn) {
                    doneBtn.style.display = 'block';
                    doneBtn.innerHTML = 'Done'; // Reset to default text
                }
            }
            break;
        case 'paused':
            recordBtn.classList.add('paused');
            recordIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.623 30.9023C26.2143 30.9023 27.7405 30.2702 28.8657 29.145C29.9909 28.0198 30.623 26.4936 30.623 24.9023V12.9023C30.623 11.311 29.9909 9.78492 28.8657 8.6597C27.7405 7.53448 26.2143 6.90234 24.623 6.90234C23.0317 6.90234 21.5056 7.53448 20.3804 8.6597C19.2552 9.78492 18.623 11.311 18.623 12.9023V24.9023C18.623 26.4936 19.2552 28.0198 20.3804 29.145C21.5056 30.2702 23.0317 30.9023 24.623 30.9023ZM22.623 12.9023C22.623 12.3719 22.8338 11.8632 23.2088 11.4881C23.5839 11.1131 24.0926 10.9023 24.623 10.9023C25.1535 10.9023 25.6622 11.1131 26.0373 11.4881C26.4123 11.8632 26.623 12.3719 26.623 12.9023V24.9023C26.623 25.4328 26.4123 25.9415 26.0373 26.3166C25.6622 26.6916 25.1535 26.9023 24.623 26.9023C24.0926 26.9023 23.5839 26.6916 23.2088 26.3166C22.8338 25.9415 22.623 25.4328 22.623 24.9023V12.9023ZM24.623 34.9023C27.2752 34.9023 29.8188 33.8488 31.6941 31.9734C33.5695 30.098 34.623 27.5545 34.623 24.9023H38.623C38.6191 28.266 37.4042 31.5159 35.2007 34.0573C32.9971 36.5987 29.9522 38.2618 26.623 38.7423V44.9023H22.623V38.7423C19.2939 38.2618 16.249 36.5987 14.0454 34.0573C11.8419 31.5159 10.627 28.266 10.623 24.9023H14.623C14.623 27.5545 15.6766 30.098 17.552 31.9734C19.4273 33.8488 21.9709 34.9023 24.623 34.9023V34.9023Z" fill="currentColor"/>
                </svg>
            `;
            recordLabel.textContent = 'Resume';
            if (playbackSection) playbackSection.style.display = 'none';
            
            // For regular recordings, show Done button when paused too
            if (currentRecordingKey === 'sound-check') {
                if (doneBtn) doneBtn.style.display = 'none';
            } else {
                if (doneBtn) {
                    doneBtn.style.display = 'block';
                    doneBtn.innerHTML = 'Done'; // Reset to default text
                }
            }
            break;
        case 'completed':
            // Hide the record button when completed
            recordBtn.style.display = 'none';
            recordLabel.style.display = 'none';
            
            if (isPlaybackMode) {
                // Playback mode: all recordings show playback controls
                if (playbackSection) playbackSection.style.display = 'block';
                if (doneBtn) {
                    doneBtn.style.display = 'block';
                    doneBtn.innerHTML = 'Done';
                }
                // Keep instruction text visible in playback mode
                const instructionEl = document.getElementById('recording-instruction');
                if (instructionEl) instructionEl.style.display = 'block';
            } else {
                // Recording completion mode: different behavior for sound check vs regular recordings
                if (currentRecordingKey === 'sound-check') {
                    // Sound check: show playback controls and hide instruction
                    if (playbackSection) playbackSection.style.display = 'block';
                    if (doneBtn) doneBtn.style.display = 'block';
                    const instructionEl = document.getElementById('recording-instruction');
                    if (instructionEl) instructionEl.style.display = 'none';
                } else {
                    // Regular recordings: show done button with checkmark, no playback controls
                    if (playbackSection) playbackSection.style.display = 'none';
                    if (doneBtn) {
                        doneBtn.style.display = 'block';
                        doneBtn.innerHTML = `
                            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white"/>
                                </svg>
                                Done
                            </div>
                        `;
                    }
                    // Keep instruction text visible for regular recordings
                    const instructionEl = document.getElementById('recording-instruction');
                    if (instructionEl) instructionEl.style.display = 'block';
                }
            }
            break;
    }
}

function toggleEditMode() {
    const editBtn = document.getElementById('edit-recordings');
    const recordingItems = document.querySelectorAll('.recording-item');
    
    const isEditMode = editBtn.textContent === 'Done';
    
    if (isEditMode) {
        // Exit edit mode - change Done back to Edit and hide trash icons
        editBtn.textContent = 'Edit';
        recordingItems.forEach(item => item.classList.remove('edit-mode'));
    } else {
        // Enter edit mode - change Edit to Done and show trash icons
        editBtn.textContent = 'Done';
        recordingItems.forEach(item => {
            if (item.classList.contains('completed')) {
                item.classList.add('edit-mode');
            }
        });
    }
    
    // Refresh the recording statuses to show/hide delete buttons
    updateRecordingStatuses();
}

function deleteRecording(recordingKey) {
    const interview = currentScreen === 'management-interview' 
        ? managementInterviews[currentManagementInterview]
        : interviews[currentInterview];
    interview.recordings[recordingKey].completed = false;
    updateRecordingStatuses();
    
    if (currentScreen === 'management-interview') {
        updateManagementProgress();
    } else {
        updateInterviewProgress();
    }
}

function toggleManagementEditMode() {
    const editBtn = document.getElementById('edit-management-interviews');
    const interviewItems = document.querySelectorAll('.management-interview-list .interview-item');
    
    const isEditMode = editBtn.textContent === 'Done';
    
    if (isEditMode) {
        // Exit edit mode - change Done back to Edit and hide trash icons
        editBtn.textContent = 'Edit';
        interviewItems.forEach(item => item.classList.remove('edit-mode'));
    } else {
        // Enter edit mode - change Edit to Done and show trash icons
        editBtn.textContent = 'Done';
        interviewItems.forEach(item => {
            item.classList.add('edit-mode');
        });
    }
    
    // Refresh the management interview list to show/hide delete buttons
    generateManagementInterviewList();
}

function deleteManagementInterview(index) {
    managementInterviews.splice(index, 1);
    generateManagementInterviewList();
    updateManagementTaskProgress();
}

function isInEditMode() {
    // Check if any edit buttons are in "Done" state
    const editRecordingsBtn = document.getElementById('edit-recordings');
    const editManagementBtn = document.getElementById('edit-management-interviews');
    
    const inEditMode = (editRecordingsBtn && editRecordingsBtn.textContent === 'Done') ||
           (editManagementBtn && editManagementBtn.textContent === 'Done');
    
    return inEditMode;
}

function exitEditMode() {
    // Exit recording edit mode if active
    const editRecordingsBtn = document.getElementById('edit-recordings');
    if (editRecordingsBtn && editRecordingsBtn.textContent === 'Done') {
        toggleEditMode();
        return true;
    }
    
    // Exit management edit mode if active
    const editManagementBtn = document.getElementById('edit-management-interviews');
    if (editManagementBtn && editManagementBtn.textContent === 'Done') {
        toggleManagementEditMode();
        return true;
    }
    
    return false;
}

function handleBackNavigation(targetScreen) {
    // If in edit mode, exit edit mode instead of navigating
    if (isInEditMode()) {
        exitEditMode();
        return;
    }
    
    // Otherwise, navigate to target screen
    showScreen(targetScreen);
}

function updateManagementProgress() {
    const interview = managementInterviews[currentManagementInterview];
    
    // Save current step data based on which step we're on
    if (currentManagementStep === 1) {
        const managerName = document.getElementById('manager-name')?.value || '';
        const selectedRole = document.querySelector('input[name="manager-role"]:checked');
        const familySearchUsername = document.getElementById('familysearch-username')?.value || '';
        
        interview.name = managerName;
        interview.role = selectedRole ? getRoleDisplayName(selectedRole.value) : '';
        interview.familySearchUsername = familySearchUsername;
    } else if (currentManagementStep === 3) {
        const selectedRating = document.querySelector('input[name="manager-rating"]:checked');
        if (selectedRating) {
            interview.managerRating = selectedRating.value;
        }
    } else if (currentManagementStep === 4) {
        const additionalInfo = document.getElementById('additional-rating-info')?.value || '';
        interview.additionalRatingInfo = additionalInfo;
    }
    
    // Now calculate the actual filled steps by checking each step completely
    let filledSteps = 0;
    
    // Step 1: Manager Information - ALL fields required
    if (interview.name && interview.name.trim() !== '' && 
        interview.role && interview.role !== '' && 
        interview.familySearchUsername && interview.familySearchUsername.trim() !== '') {
        filledSteps = 1;
        
        // Step 2: Recordings - ALL required recordings must be completed
        const requiredRecordings = Object.keys(interview.recordings).filter(key => !interview.recordings[key].optional);
        const completedRequired = requiredRecordings.filter(key => interview.recordings[key].completed);
        
        if (completedRequired.length === requiredRecordings.length) {
            filledSteps = 2;
            
            // Step 3: Manager Rating - rating must be selected
            if (interview.managerRating && interview.managerRating !== '') {
                filledSteps = 3;
                
                // Step 4: Additional Information - this is optional, so step 3 completion means step 4 is also complete
                filledSteps = 4;
            }
        }
    }
    
    // Update the interview's filled steps
    interview.filledSteps = filledSteps;
    
    // Update the interview list
    generateManagementInterviewList();
}

function getRoleDisplayName(roleValue) {
    const roleMap = getRoleMap();
    return roleMap[roleValue] || roleValue;
}

// Live Interview Functions
function addLiveInterview() {
    // Create new live interview
    const newInterview = {
        id: `live_${Date.now()}`,
        completed: false,
        steps: 3,
        filledSteps: 0,
        interviewId: '',
        intervieweeName: '',
        intervieweesCount: 0,
        interviewHours: 0,
        namesCollected: 0,
        qualityControlFollowed: null,
        namesFromMemory: null,
        documentType: '',
        fullInterview: null,
        additionalInfo: ''
    };
    
    liveInterviews.push(newInterview);
    currentLiveInterview = liveInterviews.length - 1;
    currentLiveStep = 1;
    
    showScreen('individual-live-interview-screen');
    updateLiveInterviewScreen();
    generateLiveInterviewList();
}

function generateLiveInterviewList() {
    const liveList = document.querySelector('.live-interview-list');
    const emptyState = document.getElementById('live-empty-state');
    const floatingBtn = document.querySelector('.live-floating-plus-btn');
    const editBtn = document.getElementById('edit-live-interviews');
    
    if (!liveList) return;
    
    liveList.innerHTML = '';
    
    // Show/hide edit button based on whether there are interviews
    if (editBtn) {
        editBtn.style.display = liveInterviews.length > 0 ? 'block' : 'none';
    }
    
    if (liveInterviews.length === 0) {
        emptyState.style.display = 'block';
        floatingBtn.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        floatingBtn.style.display = 'flex'; // Always show since there's no limit
        
        // Check if we're in edit mode
        const isEditMode = editBtn && editBtn.textContent === 'Done';
        
        liveInterviews.forEach((interview, index) => {
            const displayName = interview.intervieweeName || `Live Interview ${index + 1}`;
            const interviewItem = document.createElement('div');
            interviewItem.className = 'interview-item';
            
            const progressClass = interview.completed ? 'completed' : 
                                interview.filledSteps === interview.steps ? 'ready-to-complete' :
                                interview.filledSteps > 0 ? 'partial' : '';
            
            interviewItem.innerHTML = `
                <div class="interview-info">
                    <div class="interview-name">${displayName}</div>
                    <div class="interview-progress">${interview.filledSteps}/${interview.steps} steps</div>
                </div>
                <div class="interview-status">
                    <div class="progress-circle ${progressClass}">
                        <span>${interview.filledSteps}/${interview.steps}</span>
                    </div>
                    ${isEditMode ? '<button class="delete-btn" onclick="deleteLiveInterview(' + index + ')">×</button>' : ''}
                </div>
            `;
            
            if (!isEditMode) {
                interviewItem.addEventListener('click', () => {
                    currentLiveInterview = index;
                    currentLiveStep = interview.filledSteps < interview.steps ? interview.filledSteps + 1 : interview.steps;
                    showScreen('individual-live-interview-screen');
                    updateLiveInterviewScreen();
                });
            }
            
            liveList.appendChild(interviewItem);
        });
    }
}

function updateLiveInterviewScreen() {
    const interview = liveInterviews[currentLiveInterview];
    const stepIndicator = document.getElementById('current-live-step');
    const interviewId = document.getElementById('live-interview-id');
    const stepContentArea = document.getElementById('live-step-content-area');
    const previousBtn = document.getElementById('previous-live-step');
    const nextBtn = document.getElementById('next-live-step');
    const finishBtn = document.getElementById('finish-live-interview');
    
    // Check if required elements exist
    if (!stepIndicator || !interviewId || !stepContentArea) {
        console.error('Missing required DOM elements for live interview screen');
        alert('Error: Live interview screen elements not found. The HTML may be missing the individual-live-interview-screen.');
        return;
    }
    
    // Update step indicator
    stepIndicator.textContent = `Step ${currentLiveStep} of ${interview.steps}`;
    
    // Update interview ID
    const displayName = interview.intervieweeName || `Live Interview ${currentLiveInterview + 1}`;
    interviewId.textContent = displayName;
    
    // Update step content
    if (liveInterviewSteps[currentLiveStep]) {
        stepContentArea.innerHTML = liveInterviewSteps[currentLiveStep].content;
        setupLiveStepListeners();
        
        // Populate form fields based on step
        populateLiveStepData();
    }
    
    // Update navigation buttons if they exist
    if (previousBtn) {
        previousBtn.style.display = currentLiveStep > 1 ? 'block' : 'none';
    }
    
    if (nextBtn && finishBtn) {
        if (currentLiveStep < interview.steps) {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        }
    }
}

function setupLiveStepListeners() {
    // Replace camera icon placeholders with SVG
    const cameraIcons = document.querySelectorAll('#live-step-content-area .upload-icon');
    cameraIcons.forEach(icon => {
        if (icon.textContent === 'CAMERA_ICON') {
            icon.innerHTML = getCameraSVG();
        }
    });
    
    // Input field listeners
    const inputFields = document.querySelectorAll('#live-step-content-area .input-field');
    inputFields.forEach(field => {
        field.addEventListener('input', updateLiveProgress);
        field.addEventListener('blur', validateField);
    });
    
    // Toggle listeners
    const toggleOptions = document.querySelectorAll('#live-step-content-area .toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', handleToggleOption);
    });
    
    // Photo upload listeners
    const photoUploads = document.querySelectorAll('#live-step-content-area .photo-upload');
    photoUploads.forEach(upload => {
        upload.addEventListener('click', handlePhotoUpload);
    });
}

function populateLiveStepData() {
    const interview = liveInterviews[currentLiveInterview];
    
    if (currentLiveStep === 1) {
        // Step 1: Interview basics
        const fields = {
            'interview-id': interview.interviewId,
            'interviewee-name': interview.intervieweeName,
            'interviewees-count': interview.intervieweesCount,
            'interview-hours': interview.interviewHours,
            'names-collected': interview.namesCollected,
            'document-type': interview.documentType
        };
        
        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && fields[fieldId] !== null && fields[fieldId] !== '') {
                field.value = fields[fieldId];
            }
        });
        
        // Set toggle states
        if (interview.qualityControlFollowed !== null) {
            const qualityToggle = document.querySelector('#quality-control-toggle .toggle-option[data-value="' + (interview.qualityControlFollowed ? 'yes' : 'no') + '"]');
            if (qualityToggle) {
                qualityToggle.click();
            }
        }
        
        if (interview.namesFromMemory !== null) {
            const memoryToggle = document.querySelector('#names-memory-toggle .toggle-option[data-value="' + (interview.namesFromMemory ? 'yes' : 'no') + '"]');
            if (memoryToggle) {
                memoryToggle.click();
            }
        }
    } else if (currentLiveStep === 3) {
        // Step 3: Additional info
        const additionalInfoField = document.getElementById('additional-info');
        if (additionalInfoField && interview.additionalInfo) {
            additionalInfoField.value = interview.additionalInfo;
        }
        
        if (interview.fullInterview !== null) {
            const fullToggle = document.querySelector('#full-interview-toggle .toggle-option[data-value="' + (interview.fullInterview ? 'yes' : 'no') + '"]');
            if (fullToggle) {
                fullToggle.click();
            }
        }
    }
}

function navigateLiveStep(direction) {
    const interview = liveInterviews[currentLiveInterview];
    const newStep = currentLiveStep + direction;
    
    // Allow going back at any time
    if (direction < 0) {
        if (newStep >= 1 && newStep <= interview.steps) {
            currentLiveStep = newStep;
            updateLiveInterviewScreen();
            updateLiveProgress();
        }
        return;
    }
    
    // Validate current step before moving forward
    if (direction > 0 && !validateCurrentLiveStep()) {
        showModal(
            'Information missing',
            'Some answers are missing or in the wrong format. Please fill out all fields correctly.',
            null,
            'VIEW ERRORS',
            'NEXT STEP'
        );
        return;
    }
    
    // Allow moving forward
    if (newStep >= 1 && newStep <= interview.steps) {
        currentLiveStep = newStep;
        updateLiveInterviewScreen();
        updateLiveProgress();
    }
}

function validateCurrentLiveStep() {
    // Clear previous validation states
    document.querySelectorAll('.input-field').forEach(field => {
        field.classList.remove('invalid', 'valid');
    });
    
    let isValid = true;
    
    if (currentLiveStep === 1) {
        // Validate Step 1: Interview basics
        const requiredFields = ['interview-id', 'interviewee-name', 'interviewees-count', 'interview-hours', 'names-collected'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field?.value || field.value.trim() === '') {
                field?.classList.add('invalid');
                isValid = false;
            } else {
                field?.classList.add('valid');
            }
        });
        
        // Check toggles
        const qualityToggle = document.querySelector('#quality-control-toggle .toggle-option.active');
        const memoryToggle = document.querySelector('#names-memory-toggle .toggle-option.active');
        
        if (!qualityToggle || !memoryToggle) {
            isValid = false;
        }
        
        // If names not from memory, document type is required
        if (memoryToggle && memoryToggle.dataset.value === 'no') {
            const docField = document.getElementById('document-type');
            if (!docField?.value || docField.value.trim() === '') {
                docField?.classList.add('invalid');
                isValid = false;
            } else {
                docField?.classList.add('valid');
            }
        }
    } else if (currentLiveStep === 2) {
        // Step 2: Photos - all required
        const requiredPhotos = ['with-interviewee', 'first-page', 'last-page'];
        requiredPhotos.forEach(photoId => {
            const photoUpload = document.querySelector(`[data-photo="${photoId}"]`);
            if (!photoUpload?.querySelector('.document-thumbnail')) {
                isValid = false;
            }
        });
    } else if (currentLiveStep === 3) {
        // Step 3: Full interview toggle is required
        const fullToggle = document.querySelector('#full-interview-toggle .toggle-option.active');
        if (!fullToggle) {
            isValid = false;
        }
    }
    
    return isValid;
}

function finishLiveInterview() {
    // Mark interview as completed
    liveInterviews[currentLiveInterview].completed = true;
    
    // Go back to live interview list
    showScreen('live-interview-screen');
    generateLiveInterviewList();
    
    // Update task progress
    updateTaskProgress();
}

function updateLiveProgress() {
    const interview = liveInterviews[currentLiveInterview];
    
    // Save current step data based on which step we're on
    if (currentLiveStep === 1) {
        interview.interviewId = document.getElementById('interview-id')?.value || '';
        interview.intervieweeName = document.getElementById('interviewee-name')?.value || '';
        interview.intervieweesCount = parseInt(document.getElementById('interviewees-count')?.value) || 0;
        interview.interviewHours = parseFloat(document.getElementById('interview-hours')?.value) || 0;
        interview.namesCollected = parseInt(document.getElementById('names-collected')?.value) || 0;
        
        const qualityToggle = document.querySelector('#quality-control-toggle .toggle-option.active');
        interview.qualityControlFollowed = qualityToggle ? qualityToggle.dataset.value === 'yes' : null;
        
        const memoryToggle = document.querySelector('#names-memory-toggle .toggle-option.active');
        interview.namesFromMemory = memoryToggle ? memoryToggle.dataset.value === 'yes' : null;
        
        interview.documentType = document.getElementById('document-type')?.value || '';
    } else if (currentLiveStep === 3) {
        const fullToggle = document.querySelector('#full-interview-toggle .toggle-option.active');
        interview.fullInterview = fullToggle ? fullToggle.dataset.value === 'yes' : null;
        
        interview.additionalInfo = document.getElementById('additional-info')?.value || '';
    }
    
    // Calculate filled steps
    let filledSteps = 0;
    
    // Step 1: All required fields filled
    if (interview.interviewId && interview.intervieweeName && 
        interview.intervieweesCount > 0 && interview.interviewHours > 0 && 
        interview.namesCollected >= 0 && interview.qualityControlFollowed !== null && 
        interview.namesFromMemory !== null &&
        (interview.namesFromMemory || interview.documentType)) {
        filledSteps = 1;
        
        // Step 2: Photos uploaded (simulated)
        filledSteps = 2;
        
        // Step 3: Full interview toggle selected
        if (interview.fullInterview !== null) {
            filledSteps = 3;
        }
    }
    
    // Update the interview's filled steps
    interview.filledSteps = filledSteps;
    
    // Update the interview list
    generateLiveInterviewList();
}

function toggleLiveEditMode() {
    const editBtn = document.getElementById('edit-live-interviews');
    const isEditMode = editBtn.textContent === 'Done';
    
    if (isEditMode) {
        editBtn.textContent = 'Edit';
        exitEditMode();
    } else {
        editBtn.textContent = 'Done';
    }
    
    generateLiveInterviewList();
}

function deleteLiveInterview(index) {
    showModal(
        'Delete Interview',
        'Are you sure you want to delete this live interview? This action cannot be undone.',
        () => {
            liveInterviews.splice(index, 1);
            generateLiveInterviewList();
        }
    );
}

// Phone Check Functions
function addPhoneCheck() {
    // Create new phone check
    const newPhoneCheck = {
        id: `phone_${Date.now()}`,
        completed: false,
        fieldAgentId: '',
        unfinishedCount: 0,
        reasons: [] // Array to store reasons for each unfinished interview
    };
    
    phoneChecks.push(newPhoneCheck);
    currentPhoneCheck = phoneChecks.length - 1;
    
    showScreen('individual-phone-check-screen');
    updatePhoneCheckScreen();
    generatePhoneCheckList();
}

function generatePhoneCheckList() {
    const phoneList = document.querySelector('.phone-check-list');
    const emptyState = document.getElementById('phone-check-empty-state');
    const hintText = document.getElementById('phone-check-hint');
    const floatingBtn = document.querySelector('.phone-check-floating-plus-btn');
    const editBtn = document.getElementById('edit-phone-checks');
    
    if (!phoneList) return;
    
    phoneList.innerHTML = '';
    
    // Show/hide edit button based on whether there are phone checks
    if (editBtn) {
        editBtn.style.display = phoneChecks.length > 0 ? 'block' : 'none';
    }
    
    if (phoneChecks.length === 0) {
        emptyState.style.display = 'block';
        hintText.style.display = 'none';
        floatingBtn.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        hintText.style.display = 'block';
        floatingBtn.style.display = 'flex';
        
        // Check if we're in edit mode
        const isEditMode = editBtn && editBtn.textContent === 'Done';
        
        phoneChecks.forEach((phoneCheck, index) => {
            const displayName = phoneCheck.fieldAgentId || `Phone Check ${index + 1}`;
            const phoneCheckItem = document.createElement('div');
            phoneCheckItem.className = 'interview-item';
            
            const progressClass = phoneCheck.completed ? 'completed' : 'partial';
            
            phoneCheckItem.innerHTML = `
                <div class="interview-info">
                    <div class="interview-name">${displayName}</div>
                    <div class="interview-progress">${phoneCheck.unfinishedCount} unfinished interviews</div>
                </div>
                <div class="interview-status">
                    <div class="progress-circle ${progressClass}">
                        <span>${phoneCheck.completed ? '✓' : '•'}</span>
                    </div>
                    ${isEditMode ? '<button class="delete-btn" onclick="deletePhoneCheck(' + index + ')">×</button>' : ''}
                </div>
            `;
            
            if (!isEditMode) {
                phoneCheckItem.addEventListener('click', () => {
                    currentPhoneCheck = index;
                    showScreen('individual-phone-check-screen');
                    updatePhoneCheckScreen();
                });
            }
            
            phoneList.appendChild(phoneCheckItem);
        });
    }
}

function updatePhoneCheckScreen() {
    const phoneCheck = phoneChecks[currentPhoneCheck];
    const phoneCheckId = document.getElementById('phone-check-id');
    const contentArea = document.getElementById('phone-check-content-area');
    
    // Update phone check ID
    const displayName = phoneCheck.fieldAgentId || `Phone Check ${currentPhoneCheck + 1}`;
    phoneCheckId.textContent = displayName;
    
    // Generate dynamic content based on unfinished interview count
    contentArea.innerHTML = generatePhoneCheckContent(phoneCheck);
    
    // Setup listeners
    setupPhoneCheckListeners();
    
    // Populate existing data
    populatePhoneCheckData();
}

function generatePhoneCheckContent(phoneCheck) {
    let content = `
        <div class="question">
            <div class="form-group">
                <label>Field Agent ID of phone user:</label>
                <input type="text" class="input-field" id="field-agent-id" placeholder="Ex:111">
            </div>
            <div class="form-group">
                <label>How many unfinished interviews are on this phone?</label>
                <input type="number" class="input-field" id="unfinished-count" min="0" placeholder="Enter number">
            </div>
    `;
    
    // Add reason fields for each unfinished interview
    for (let i = 0; i < phoneCheck.unfinishedCount; i++) {
        content += `
            <div class="form-group">
                <label>Why is Interview #${i + 1} unfinished?</label>
                <textarea class="input-field" id="reason-${i}" rows="3" placeholder="Enter reason..."></textarea>
            </div>
        `;
    }
    
    content += `</div>`;
    
    return content;
}

function setupPhoneCheckListeners() {
    // Input field listeners - exclude unfinished-count field since it has special handling
    const inputFields = document.querySelectorAll('#phone-check-content-area .input-field');
    
    inputFields.forEach(field => {
        // Skip the unfinished-count field - it has its own special listeners
        if (field.id !== 'unfinished-count') {
            field.addEventListener('input', updatePhoneCheckProgress);
            field.addEventListener('blur', validateField);
        }
    });
    
    // Special listener for unfinished count to regenerate content
    // Use 'change' event instead of 'input' to avoid interfering with typing
    const unfinishedCountField = document.getElementById('unfinished-count');
    
    if (unfinishedCountField) {
        unfinishedCountField.addEventListener('change', handleUnfinishedCountChange);
        unfinishedCountField.addEventListener('blur', handleUnfinishedCountChange);
        // Also add input listener just for validation styling, but not for progress updates
        unfinishedCountField.addEventListener('blur', validateField);
    }
}

function handleUnfinishedCountChange() {
    const phoneCheck = phoneChecks[currentPhoneCheck];
    const unfinishedCountField = document.getElementById('unfinished-count');
    const newCount = parseInt(unfinishedCountField.value);
    
    // Handle the case where input is empty or not a valid number
    const validCount = isNaN(newCount) ? 0 : Math.max(0, newCount);
    
    // Only regenerate if the count actually changed
    if (phoneCheck.unfinishedCount === validCount) {
        return;
    }
    
    // Update the phone check data
    phoneCheck.unfinishedCount = validCount;
    
    // Resize reasons array
    if (validCount > phoneCheck.reasons.length) {
        // Add empty reasons
        while (phoneCheck.reasons.length < validCount) {
            phoneCheck.reasons.push('');
        }
    } else if (validCount < phoneCheck.reasons.length) {
        // Remove excess reasons - when count is 0, this will create empty array
        phoneCheck.reasons = phoneCheck.reasons.slice(0, validCount);
    }
    
    // Regenerate content
    updatePhoneCheckScreen();
}

function populatePhoneCheckData() {
    const phoneCheck = phoneChecks[currentPhoneCheck];
    
    // Populate basic fields
    const fieldAgentIdField = document.getElementById('field-agent-id');
    const unfinishedCountField = document.getElementById('unfinished-count');
    
    if (fieldAgentIdField && phoneCheck.fieldAgentId) {
        fieldAgentIdField.value = phoneCheck.fieldAgentId;
    }
    
    if (unfinishedCountField && phoneCheck.unfinishedCount > 0) {
        unfinishedCountField.value = phoneCheck.unfinishedCount;
    }
    
    // Populate reason fields
    phoneCheck.reasons.forEach((reason, index) => {
        const reasonField = document.getElementById(`reason-${index}`);
        if (reasonField && reason) {
            reasonField.value = reason;
        }
    });
}

function updatePhoneCheckProgress() {
    const phoneCheck = phoneChecks[currentPhoneCheck];
    
    // Save current data
    const fieldAgentIdField = document.getElementById('field-agent-id');
    
    if (fieldAgentIdField) {
        phoneCheck.fieldAgentId = fieldAgentIdField.value;
    }
    
    // NOTE: Don't update unfinishedCount here - let handleUnfinishedCountChange handle that
    // This prevents conflicts between the 'input' event and 'change'/'blur' events
    
    // Save reason fields
    phoneCheck.reasons.forEach((reason, index) => {
        const reasonField = document.getElementById(`reason-${index}`);
        if (reasonField) {
            phoneCheck.reasons[index] = reasonField.value;
        }
    });
    
    // Update the phone check list
    generatePhoneCheckList();
}

function finishPhoneCheck() {
    // Validate required fields
    const phoneCheck = phoneChecks[currentPhoneCheck];
    
    if (!phoneCheck.fieldAgentId || phoneCheck.fieldAgentId.trim() === '') {
        showModal(
            'Information missing',
            'Please enter the Field Agent ID.',
            null,
            'OK'
        );
        return;
    }
    
    // Check that all reason fields are filled if there are unfinished interviews
    if (phoneCheck.unfinishedCount > 0) {
        // Only check reasons if there should be unfinished interviews
        const missingReasons = phoneCheck.reasons.some(reason => !reason || reason.trim() === '');
        if (missingReasons) {
            showModal(
                'Information missing',
                'Please provide reasons for all unfinished interviews.',
                null,
                'OK'
            );
            return;
        }
    }
    // If unfinishedCount is 0, no reason validation is needed
    
    // Mark phone check as completed
    phoneCheck.completed = true;
    
    // Go back to phone check list
    showScreen('unfinished-check-screen');
    generatePhoneCheckList();
    
    // Update task progress
    updateUnfinishedCheckTaskProgress();
}

function updateUnfinishedCheckTaskProgress() {
    const completedPhoneChecks = phoneChecks.filter(pc => pc.completed).length;
    const progressCircle = document.querySelector('[data-task="unfinished-check"] .progress-circle');
    
    if (progressCircle) {
        const progressSpan = progressCircle.querySelector('span');
        progressSpan.textContent = `${completedPhoneChecks}/1`;
        
        // Remove existing progress classes
        progressCircle.classList.remove('completed', 'partial');
        
        if (completedPhoneChecks >= 1) {
            progressCircle.classList.add('completed');
        } else if (phoneChecks.length > 0) {
            // Show partial progress if there are phone checks in progress
            progressCircle.classList.add('partial');
            const progressAngle = Math.round((phoneChecks.length / Math.max(phoneChecks.length, 1)) * 360 * 0.5);
            progressCircle.style.setProperty('--progress-angle', `${progressAngle}deg`);
        }
    }
}

function togglePhoneCheckEditMode() {
    const editBtn = document.getElementById('edit-phone-checks');
    const isEditMode = editBtn.textContent === 'Done';
    
    if (isEditMode) {
        editBtn.textContent = 'Edit';
        exitEditMode();
    } else {
        editBtn.textContent = 'Done';
    }
    
    generatePhoneCheckList();
}

function deletePhoneCheck(index) {
    showModal(
        'Delete Phone Check',
        'Are you sure you want to delete this phone check? This action cannot be undone.',
        () => {
            phoneChecks.splice(index, 1);
            generatePhoneCheckList();
        }
    );
}

function finishManagementInterview() {
    // Mark interview as completed
    managementInterviews[currentManagementInterview].completed = true;
    
    // Go back to management list
    showScreen('management-team-screen');
    generateManagementInterviewList();
    
    // Update task progress
    updateManagementTaskProgress();
}

function updateManagementTaskProgress() {
    const completedInterviews = managementInterviews.filter(i => i.completed).length;
    const progressCircle = document.querySelector('[data-task="management-team"] .progress-circle');
    const progressSpan = progressCircle.querySelector('span');
    
    progressSpan.textContent = `${completedInterviews}/2`;
    
    // Remove existing progress classes
    progressCircle.classList.remove('completed', 'partial');
    
    if (completedInterviews >= 2) {
        progressCircle.classList.add('completed');
    } else if (completedInterviews > 0) {
        progressCircle.classList.add('partial');
        // Calculate and set progress angle (360 degrees = full circle)
        const progressAngle = Math.round((completedInterviews / 2) * 360);
        progressCircle.style.setProperty('--progress-angle', `${progressAngle}deg`);
    }
}

// Field Interview Functions
let fieldInterviews = [];
let currentFieldInterview = 0;
let currentFieldStep = 1;

function startFieldInterview() {
    currentScreen = 'field-interview-tasks';
    
    // Make sure field interviews are initialized
    if (fieldInterviews.length === 0) {
        initializeFieldInterviews();
    }
    
    showScreen('field-interview-tasks-screen');
    generateFieldInterviewTasksList();
}

function generateFieldInterviewTasksList() {
    const container = document.getElementById('field-interview-tasks-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    fieldInterviews.forEach((interview, index) => {
        const interviewDiv = document.createElement('div');
        interviewDiv.className = 'interview-item';
        
        const filledSteps = interview.filledSteps || 0;
        const totalSteps = interview.steps;
        
        interviewDiv.innerHTML = `
            <div class="interview-content">
                <h4>Interview ${index + 1}</h4>
                <p class="interview-info">${interview.interviewId}</p>
            </div>
            <div class="interview-actions">
                <div class="progress-circle ${filledSteps === totalSteps ? 'completed' : filledSteps > 0 ? 'partial' : ''}"
                     ${filledSteps > 0 && filledSteps < totalSteps ? `style="--progress-angle: ${Math.round((filledSteps / totalSteps) * 360)}deg"` : ''}>
                    <span>${filledSteps}/${totalSteps}</span>
                </div>
            </div>
        `;
        
        // Make sure the interview item is clickable
        interviewDiv.style.cursor = 'pointer';
        
        // Add click handler to start individual interview
        interviewDiv.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startIndividualFieldInterview(index);
        });
        
        container.appendChild(interviewDiv);
    });
}

function startIndividualFieldInterview(index) {
    currentFieldInterview = index;
    currentFieldStep = 1;
    currentScreen = 'field-interview';
    showScreen('field-interview-step-screen'); // Show the step screen directly
    showFieldInterviewStep();
}

function addFieldInterview() {
    const newInterview = {
        id: `field_${Date.now()}`,
        completed: false,
        steps: 6,
        filledSteps: 0,
        intervieweeName: '',
        metInPerson: null,
        recordings: {
            'sound-check': { completed: false, optional: true, title: 'Sound Check' },
            'names-from-last-page': { completed: false, optional: false, title: 'Names from Last Page' },
            'names-from-random-page': { completed: false, optional: false, title: 'Names from Random Page' },
            'immediate-family-names': { completed: false, optional: false, title: 'Immediate Family Names' }
        }
    };
    
    fieldInterviews.push(newInterview);
    currentFieldInterview = fieldInterviews.length - 1;
    currentFieldStep = 1;
    
    generateFieldInterviewList();
    showFieldInterviewStep();
}

function generateFieldInterviewList() {
    const container = document.querySelector('#field-interview-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    fieldInterviews.forEach((interview, index) => {
        const interviewDiv = document.createElement('div');
        interviewDiv.className = 'interview-item';
        
        const filledSteps = interview.filledSteps || 0;
        const totalSteps = interview.steps;
        
        interviewDiv.innerHTML = `
            <div class="interview-content">
                <h4>Field Interview ${index + 1}</h4>
                <p class="interview-info">${interview.intervieweeName || 'Unnamed Interviewee'}</p>
            </div>
            <div class="interview-actions">
                <div class="progress-circle ${filledSteps === totalSteps ? 'completed' : filledSteps > 0 ? 'partial' : ''}"
                     ${filledSteps > 0 && filledSteps < totalSteps ? `style="--progress-angle: ${Math.round((filledSteps / totalSteps) * 360)}deg"` : ''}>
                    <span>${filledSteps}/${totalSteps}</span>
                </div>
                <button class="icon-button edit-button" onclick="editFieldInterview(${index})">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="icon-button delete-button" onclick="deleteFieldInterview(${index})">
                    ${getTrashSVG()}
                </button>
            </div>
        `;
        
        container.appendChild(interviewDiv);
    });
    
    // Add "Add Interview" button
    const addButton = document.createElement('div');
    addButton.className = 'add-interview';
    addButton.innerHTML = `
        <button class="add-interview-btn" onclick="addFieldInterview()">
            <span class="plus-icon">+</span>
            Add Interview
        </button>
    `;
    container.appendChild(addButton);
}

function editFieldInterview(index) {
    currentFieldInterview = index;
    currentFieldStep = 1;
    showFieldInterviewStep();
}

function deleteFieldInterview(index) {
    if (fieldInterviews.length <= 1) {
        showModal('Cannot Delete', 'You must have at least one field interview.');
        return;
    }
    
    showModal(
        'Delete Interview',
        'Are you sure you want to delete this field interview? This action cannot be undone.',
        [
            {
                text: 'Cancel',
                style: 'secondary'
            },
            {
                text: 'Delete',
                style: 'destructive',
                action: () => {
                    fieldInterviews.splice(index, 1);
                    if (currentFieldInterview >= fieldInterviews.length) {
                        currentFieldInterview = fieldInterviews.length - 1;
                    }
                    generateFieldInterviewList();
                    updateFieldTaskProgress();
                }
            }
        ]
    );
}

function showFieldInterviewStep() {
    const interview = fieldInterviews[currentFieldInterview];
    if (!interview) {
        return;
    }
    
    console.log(`Showing field step ${currentFieldStep}`); // Debug log
    
    const stepData = fieldInterviewSteps[currentFieldStep];
    if (!stepData) {
        return;
    }
    
    // Show the field interview step screen
    showScreen('field-interview-step-screen');
    
    // Update interview ID and step counter in subheader
    document.getElementById('field-interview-id').textContent = interview.interviewId;
    document.getElementById('field-step-counter').textContent = `Step ${currentFieldStep} of 6`;
    
    // Update step content
    document.getElementById('field-step-content').innerHTML = stepData.content;
    
    // Initialize camera icons and other step listeners
    setupStepListeners();
    
    // Show/hide navigation buttons
    const prevButton = document.getElementById('field-prev-step');
    const nextButton = document.getElementById('field-next-step');
    
    prevButton.style.display = currentFieldStep > 1 ? 'block' : 'none';
    nextButton.textContent = currentFieldStep === 6 ? 'Finish Interview' : 'Next';
    
    // Ensure the button is clickable and has proper styling
    nextButton.style.pointerEvents = 'auto';
    nextButton.style.cursor = 'pointer';
    
    // Initialize step-specific functionality
    initializeFieldStepFunctionality();
    
    // Set up navigation button event listeners (ensure they're attached)
    setupFieldNavigationListeners();
    
    // Restore form data
    restoreFieldFormData();
    
    // Update progress
    updateFieldInterviewProgress();
}

function initializeFieldStepFunctionality() {
    if (currentFieldStep === 1) {
        // Initialize toggle groups for step 1
        initializeToggleGroups();
        
        // Set up conditional content handling for the main Yes/No question
        setupFieldStep1ConditionalContent();
        
        // Initialize nested toggle groups
        setTimeout(() => {
            initializeNestedToggleGroups();
        }, 100);
        
    } else if (currentFieldStep === 2) {
        // Initialize recording functionality
        initializeFieldRecordingStep();
    } else if (currentFieldStep === 4) {
        // Initialize Family Booklet step
        initializeToggleGroups();
        
        // Handle booklet availability
        const toggleGroup = document.querySelector('.toggle-group');
        if (toggleGroup) {
            toggleGroup.addEventListener('click', (e) => {
                if (e.target.classList.contains('toggle-option')) {
                    const value = e.target.dataset.value;
                    const interview = fieldInterviews[currentFieldInterview];
                    interview.bookletAvailable = value === 'yes';
                }
            });
        }
        
        // Initialize nested toggle groups
        setTimeout(() => {
            initializeNestedToggleGroups();
            initializeMismatchedAgesField();
        }, 100);
        
    } else if (currentFieldStep === 5) {
        // Initialize count mismatch detection
        initializeCountMismatchDetection();
    }
    
    // Initialize photo uploads
    initializePhotoUploads();
    initializeRadioGroups();
}

function initializeFieldRecordingStep() {
    const recordingItems = document.querySelectorAll('.recording-item');
    const interview = fieldInterviews[currentFieldInterview];
    
    recordingItems.forEach(item => {
        const recordingId = item.dataset.recording;
        const statusElement = item.querySelector('.recording-status');
        const recording = interview.recordings[recordingId];
        
        // Set initial status
        updateFieldRecordingStatus(statusElement, recording);
        
        // Add click handler
        item.addEventListener('click', () => {
            currentFieldRecording = recordingId;
            
            // Special handling for completed sound check
            if (recordingId === 'sound-check' && recording.completed) {
                showCompletedSoundCheck();
            } else if (recordingId === 'sound-check') {
                showSoundCheckRecording();
            } else {
                showFieldRecordingModal();
            }
        });
    });
}

function updateFieldRecordingStatus(statusElement, recording) {
    if (recording.completed) {
        statusElement.innerHTML = '<span class="status-badge done">✓ Done</span>';
    } else if (recording.attempted) {
        statusElement.innerHTML = '<span class="status-badge missing">! Missing</span>';
    } else {
        statusElement.innerHTML = '';
    }
}

function showFieldRecordingModal() {
    const recordingId = currentFieldRecording;
    const recordingData = fieldRecordingDetails[recordingId];
    
    if (!recordingData) return;
    
    const modalContent = `
        <div class="recording-modal">
            <div class="recording-header">
                <h2>${recordingData.title}</h2>
            </div>
            <div class="recording-steps">
                ${recordingData.steps.map((step, index) => `
                    <div class="recording-step ${step.isPreStep ? 'pre-step' : ''} ${step.isFollowUp ? 'follow-up-step' : ''}" data-step="${index}">
                        <h3>${step.title}</h3>
                        <div class="step-content">${step.content}</div>
                        ${step.hasRecording ? `
                            <div class="recording-controls">
                                <button class="record-button" onclick="showFieldRecordingScreen()"
                                    <span class="record-icon">${getMicSVG()}</span>
                                    <span class="record-text">Start Recording</span>
                                </button>
                                <div class="recording-timer hidden">
                                    <span class="timer-display">00:00</span>
                                    <button class="stop-button" onclick="stopFieldRecording()">Stop</button>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="recording-actions">
                <button class="secondary-button" onclick="closeModal()">Back</button>
                <button class="primary-button" onclick="completeFieldRecording()">Done</button>
            </div>
        </div>
    `;
    
    showModal('', modalContent, [], true);
    
    // Initialize follow-up functionality if needed
    if (recordingId === 'immediate-family-names') {
        initializeFamilyMembersStep();
    }
}

let currentFieldRecording = null;
let fieldRecordingState = 'idle';
let fieldRecordingTimer = null;
let fieldRecordingSeconds = 0;

function toggleFieldRecording() {
    const recordButton = document.querySelector('.record-button');
    const timerDiv = document.querySelector('.recording-timer');
    const timerDisplay = document.querySelector('.timer-display');
    
    if (fieldRecordingState === 'idle') {
        // Start recording
        fieldRecordingState = 'recording';
        fieldRecordingSeconds = 0;
        
        recordButton.classList.add('hidden');
        timerDiv.classList.remove('hidden');
        
        fieldRecordingTimer = setInterval(() => {
            fieldRecordingSeconds++;
            const minutes = Math.floor(fieldRecordingSeconds / 60);
            const seconds = fieldRecordingSeconds % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

function stopFieldRecording() {
    if (fieldRecordingState === 'recording') {
        fieldRecordingState = 'completed';
        clearInterval(fieldRecordingTimer);
        
        const recordButton = document.querySelector('.record-button');
        const timerDiv = document.querySelector('.recording-timer');
        
        recordButton.classList.remove('hidden');
        timerDiv.classList.add('hidden');
        
        recordButton.innerHTML = '<span class="record-icon">✓</span><span class="record-text">Recorded</span>';
        recordButton.classList.add('recorded');
    }
}

function completeFieldRecording() {
    const interview = fieldInterviews[currentFieldInterview];
    const recording = interview.recordings[currentFieldRecording];
    
    if (fieldRecordingState === 'completed') {
        recording.completed = true;
        updateFieldRecordingStatuses();
        closeModal();
    } else if (fieldRecordingState === 'idle') {
        recording.attempted = true;
        updateFieldRecordingStatuses();
        closeModal();
    } else {
        // For regular recordings, complete them and then go back
        recording.completed = true;
        if (fieldRecordingState === 'recording') {
            stopFieldRecording();
            updateFieldRecordingStatuses();
        }
        closeModal();
    }
}

function updateFieldRecordingStatuses() {
    const recordingItems = document.querySelectorAll('.recording-item');
    const interview = fieldInterviews[currentFieldInterview];
    
    recordingItems.forEach(item => {
        const recordingId = item.dataset.recording;
        const statusElement = item.querySelector('.recording-status');
        const recording = interview.recordings[recordingId];
        
        updateFieldRecordingStatus(statusElement, recording);
    });
    
    // Update interview progress
    updateFieldInterviewProgress();
}

function handleFieldRecordingClick(e) {
    // Don't navigate if clicking delete button
    if (e.target.classList.contains('delete-recording-btn')) {
        return;
    }
    
    const recordingKey = e.currentTarget.dataset.recording;
    const interview = fieldInterviews[currentFieldInterview];
    const isCompleted = interview && interview.recordings && interview.recordings[recordingKey] && interview.recordings[recordingKey].completed;
    
    if (isCompleted) {
        // Show playback screen for completed recordings
        showFieldPlaybackScreen(recordingKey);
    } else {
        // Start recording for incomplete recordings
        startFieldRecording(recordingKey);
    }
}

function showFieldPlaybackScreen(recordingKey) {
    const questionData = fieldRecordingQuestions[recordingKey];
    currentFieldRecording = recordingKey;
    
    // Show modal for playback - reuse the existing recording modal structure but with playback state
    const modalContent = `
        <div class="recording-modal">
            <div class="recording-header">
                <h3>${questionData.title}</h3>
                <p>${questionData.instruction}</p>
            </div>
            <div class="recording-content">
                <div class="playback-controls">
                    <button class="play-button" onclick="toggleFieldPlayback()">
                        <span class="play-icon">▶️</span>
                        <span class="play-text">Play Recording</span>
                    </button>
                    <div class="playback-timer">
                        <span class="timer-display">00:00</span>
                    </div>
                </div>
            </div>
            <div class="recording-actions">
                <button class="secondary-button" onclick="closeModal()">Back</button>
                <button class="primary-button" onclick="closeModal()">Done</button>
            </div>
        </div>
    `;
    
    showModalWithContent('Recording Playback', modalContent);
}

function startFieldRecording(recordingKey) {
    const questionData = fieldRecordingQuestions[recordingKey];
    currentFieldRecording = recordingKey;
    fieldRecordingState = 'idle';
    
    const modalContent = createFieldRecordingModalContent(recordingKey, questionData);
    showModalWithContent('Field Interview Recording', modalContent);
}

function createFieldRecordingModalContent(recordingKey, questionData) {
    return `
        <div class="recording-modal">
            <div class="recording-header">
                <h3>${questionData.title}</h3>
                <p>${questionData.instruction}</p>
            </div>
            <div class="recording-content">
                <div class="recording-controls">
                    <button class="record-button" onclick="showFieldRecordingScreen()"
                        <span class="record-icon">${getMicSVG()}</span>
                        <span class="record-text">Start Recording</span>
                    </button>
                    <div class="recording-timer hidden">
                        <span class="timer-display">00:00</span>
                        <button class="stop-button" onclick="stopFieldRecording()">Stop</button>
                    </div>
                </div>
            </div>
            <div class="recording-actions">
                <button class="secondary-button" onclick="closeModal()">Back</button>
                <button class="primary-button" onclick="completeFieldRecording()">Done</button>
            </div>
        </div>
    `;
}

function handleFieldRadioSelection(e) {
    const radioOption = e.currentTarget;
    const radioGroup = radioOption.closest('.radio-group');
    const radioInput = radioOption.querySelector('input[type="radio"]');
    
    // Remove selected class from all options in this group
    radioGroup.querySelectorAll('.radio-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    radioOption.classList.add('selected');
    radioInput.checked = true;
    
    // Update field interview progress
    updateFieldInterviewProgress();
}

function restoreFieldFormData() {
    const interview = fieldInterviews[currentFieldInterview];
    
    if (currentFieldStep === 1) {
        // Restore meeting in person choice
        if (interview.metInPerson !== null) {
            const value = interview.metInPerson ? 'yes' : 'no';
            const toggleOption = document.querySelector(`.toggle-option[data-value="${value}"]`);
            if (toggleOption) {
                toggleOption.classList.add('active');
                
                // Show appropriate conditional content
                const yesContent = document.getElementById('yes-content');
                const noContent = document.getElementById('no-content');
                
                if (interview.metInPerson) {
                    yesContent.classList.remove('hidden');
                    noContent.classList.add('hidden');
                } else {
                    yesContent.classList.add('hidden');
                    noContent.classList.remove('hidden');
                }
            }
        }
    } else if (currentFieldStep === 4) {
        // Restore booklet availability choice
        if (interview.bookletAvailable !== null) {
            const value = interview.bookletAvailable ? 'yes' : 'no';
            const toggleOption = document.querySelector(`.toggle-option[data-value="${value}"]`);
            if (toggleOption) {
                toggleOption.classList.add('active');
                
                // Show appropriate conditional content
                const yesContent = document.getElementById('yes-content');
                const noContent = document.getElementById('no-content');
                
                if (interview.bookletAvailable) {
                    yesContent.classList.remove('hidden');
                    noContent.classList.add('hidden');
                } else {
                    yesContent.classList.add('hidden');
                    noContent.classList.remove('hidden');
                }
            }
        }
    }
}

function calculateTotalFieldSteps(interview) {
    let totalSteps = 6; // Start with all 6 steps
    
    // If user said they did NOT meet in person, subtract steps 2 and 3
    if (interview.metInPerson === false) {
        totalSteps -= 2; // Remove steps 2 (recordings) and 3 (interview info)
    }
    
    // If user said booklet was NOT available, subtract step 5
    if (interview.bookletAvailable === false) {
        totalSteps -= 1; // Remove step 5 (booklet details)
    }
    
    return totalSteps;
}

function getDisplayStepNumber(actualStep, interview) {
    // Map actual step numbers to display step numbers based on skipped steps
    let displayStep = actualStep;
    
    // If steps 2 and 3 are skipped (didn't meet in person), adjust display numbers
    if (interview.metInPerson === false) {
        if (actualStep > 3) {
            displayStep -= 2; // Steps 4,5,6 become 2,3,4
        }
    }
    
    // If step 5 is skipped (no booklet), adjust display numbers
    if (interview.bookletAvailable === false) {
        if (actualStep > 5) {
            displayStep -= 1; // Step 6 becomes one less
        }
    }
    
    return displayStep;
}

function setupFieldNavigationListeners() {
    // Remove any existing listeners to prevent duplicates
    const prevButton = document.getElementById('field-prev-step');
    const nextButton = document.getElementById('field-next-step');
    
    if (prevButton) {
        prevButton.removeEventListener('click', prevFieldStep);
        prevButton.addEventListener('click', prevFieldStep);
    }
    
    if (nextButton) {
        nextButton.removeEventListener('click', nextFieldStep);
        nextButton.addEventListener('click', nextFieldStep);
        console.log('Field next button listener attached'); // Debug log
    }
}

function updateFieldInterviewProgress() {
    const interview = fieldInterviews[currentFieldInterview];
    if (!interview) return;
    
    let filledSteps = 0;
    
    // Step 1: Meeting interviewee
    if (interview.metInPerson !== null) filledSteps++;
    
    // Step 2: Recordings
    const requiredRecordings = Object.keys(interview.recordings).filter(key => !interview.recordings[key].optional);
    const completedRequired = requiredRecordings.filter(key => interview.recordings[key].completed);
    if (completedRequired.length === requiredRecordings.length) filledSteps++;
    
    // Step 3: Interview info
    if (interview.interviewInfoCompleted) filledSteps++;
    
    // Step 4: Family Booklet basics
    if (interview.bookletAvailable !== null) filledSteps++;
    
    // Step 5: Family Booklet details
    if (interview.bookletDetailsCompleted) filledSteps++;
    
    // Step 6: Additional Information
    if (interview.additionalInfo) filledSteps++;
    
    interview.filledSteps = filledSteps;
    interview.completed = interview.filledSteps >= interview.steps;
    
    // Update the appropriate list depending on current screen
    if (currentScreen === 'field-interview-tasks') {
        generateFieldInterviewTasksList();
    } else {
        generateFieldInterviewList();
    }
}

function nextFieldStep() {
    console.log('nextFieldStep called, currentFieldStep:', currentFieldStep); // Debug log
    const interview = fieldInterviews[currentFieldInterview];
    
    if (!interview) {
        console.error('No interview found at index:', currentFieldInterview);
        return;
    }
    
    // Validate current step before moving forward
    if (!validateCurrentFieldStep()) {
        showModal(
            'Information missing',
            'Some answers are missing or in the wrong format. Please fill out all fields correctly.',
            null,
            'VIEW ERRORS',
            'NEXT STEP'
        );
        return;
    }
    
    if (currentFieldStep < 6) {
        currentFieldStep++;
        showFieldInterviewStep();
    } else {
        // "Finish Interview" button should do exactly what the back button does
        console.log('Finishing field interview - going back to tasks screen...'); // Debug log
        handleBackNavigation('field-interview-tasks-screen');
    }
}

function prevFieldStep() {
    if (currentFieldStep > 1) {
        currentFieldStep--;
        showFieldInterviewStep();
    }
}

function getValidFieldStep(step, interview) {
    // Ensure we're on a valid step based on user's answers
    // Only apply skipping if the user has actually answered the prerequisite questions
    
    // If on step 2 or 3 but user answered "No" to meeting interviewee, go to step 4
    if ((step === 2 || step === 3) && interview.metInPerson === false) {
        console.log(`Skipping step ${step} because metInPerson is false`); // Debug log
        return 4; // Family Booklet basics
    }
    
    // If on step 5 but user answered "No" to booklet availability, go to step 6
    if (step === 5 && interview.bookletAvailable === false) {
        console.log(`Skipping step ${step} because bookletAvailable is false`); // Debug log
        return 6; // Additional Information
    }
    
    return step; // Step is valid
}

function getNextValidFieldStep(step, interview) {
    // Skip steps 2 and 3 if user did not meet interviewee in person
    if (step === 2 && interview.metInPerson === false) {
        step = 4; // Skip to Family Booklet basics
    } else if (step === 3 && interview.metInPerson === false) {
        step = 4; // Skip to Family Booklet basics
    }
    
    // Skip step 5 if booklet is not available
    if (step === 5 && interview.bookletAvailable === false) {
        step = 6; // Skip to Additional Information
    }
    
    return step;
}

function getPreviousValidFieldStep(step, interview) {
    // Skip step 5 if booklet is not available (going backwards)
    if (step === 5 && interview.bookletAvailable === false) {
        step = 4; // Go back to Family Booklet basics
    }
    
    // Skip steps 3 and 2 if user did not meet interviewee in person (going backwards)
    if (step === 3 && interview.metInPerson === false) {
        step = 1; // Go back to meeting interviewee question
    } else if (step === 2 && interview.metInPerson === false) {
        step = 1; // Go back to meeting interviewee question
    }
    
    return step;
}

function validateCurrentFieldStep() {
    const interview = fieldInterviews[currentFieldInterview];
    console.log(`Validating field step ${currentFieldStep}, interview:`, interview); // Debug log
    
    switch (currentFieldStep) {
        case 1:
            // Step 1: Must select yes or no for meeting interviewee in person
            console.log(`Step 1 validation: metInPerson = ${interview?.metInPerson}`); // Debug log
            return interview && interview.metInPerson !== null;
            
        case 2:
            // Step 2: Recordings (only required if met in person and have recording items)
            if (interview && interview.metInPerson === true) {
                // Check if all non-optional recordings are completed
                const recordingItems = document.querySelectorAll('.recording-item');
                if (recordingItems.length === 0) return true; // No recordings required
                
                // Check each recording item's status
                let allRequiredCompleted = true;
                recordingItems.forEach(item => {
                    const recordingKey = item.dataset.recording;
                    const isOptional = interview.recordings && interview.recordings[recordingKey] && interview.recordings[recordingKey].optional;
                    const isCompleted = interview.recordings && interview.recordings[recordingKey] && interview.recordings[recordingKey].completed;
                    
                    if (!isOptional && !isCompleted) {
                        allRequiredCompleted = false;
                    }
                });
                
                return allRequiredCompleted;
            }
            return true; // Skip validation if didn't meet in person
            
        case 3:
            // Step 3: Interview info (only required if met in person)
            if (interview && interview.metInPerson === true) {
                // Check if was paid toggle is selected
                const wasPaidToggle = document.querySelector('.toggle-group .toggle-option.active');
                // Check if interview duration radio is selected
                const durationRadio = document.querySelector('input[name="interview-duration"]:checked');
                return wasPaidToggle !== null && durationRadio !== null;
            }
            return true; // Skip validation if didn't meet in person
            
        case 4:
            // Step 4: Must select yes or no for family booklet available
            return interview && interview.bookletAvailable !== null;
            
        case 5:
            // Step 5: Booklet details (only required if booklet available)
            if (interview && interview.bookletAvailable === true) {
                // Check if booklet used toggle is selected
                const bookletUsedToggle = document.querySelector('.toggle-group .toggle-option.active');
                return bookletUsedToggle !== null;
            }
            return true; // Skip validation if booklet not available
            
        case 6:
            // Step 6: Additional comments (optional, always valid)
            return true;
            
        default:
            return true;
    }
}

function updateFieldTaskProgress() {
    const completedInterviews = fieldInterviews.filter(i => i.completed).length;
    const progressCircle = document.querySelector('[data-task="field-interviews"] .progress-circle');
    const progressSpan = progressCircle.querySelector('span');
    
    progressSpan.textContent = `${completedInterviews}/10`;
    
    // Remove existing progress classes
    progressCircle.classList.remove('completed', 'partial');
    
    if (completedInterviews >= 10) {
        progressCircle.classList.add('completed');
    } else if (completedInterviews > 0) {
        progressCircle.classList.add('partial');
        // Calculate and set progress angle (360 degrees = full circle)
        const progressAngle = Math.round((completedInterviews / 10) * 360);
        progressCircle.style.setProperty('--progress-angle', `${progressAngle}deg`);
    }
}

// Helper functions for field interviews
function initializeMismatchedAgesField() {
    const countField = document.getElementById('mismatched-count');
    const container = document.getElementById('mismatched-names-container');
    
    if (countField && container) {
        countField.addEventListener('input', () => {
            const count = parseInt(countField.value) || 0;
            updateMismatchedNamesFields(count, container);
        });
    }
}

function updateMismatchedNamesFields(count, container) {
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'form-group';
        fieldGroup.innerHTML = `
            <label>Name ${i}</label>
            <input type="text" class="input-field" placeholder="Enter name...">
            <label>Age on the paper collection form</label>
            <input type="number" class="input-field" min="0" placeholder="Enter age...">
            <label>Age in the family booklet</label>
            <input type="number" class="input-field" min="0" placeholder="Enter age...">
        `;
        container.appendChild(fieldGroup);
    }
}

function initializeCountMismatchDetection() {
    const paperFormCountField = document.getElementById('paper-form-count');
    const familyBookletCountField = document.getElementById('family-booklet-count');
    const mismatchContent = document.getElementById('count-mismatch-content');
    
    function checkCountMismatch() {
        const paperCount = parseInt(paperFormCountField.value) || 0;
        const bookletCount = parseInt(familyBookletCountField.value) || 0;
        
        if (paperCount !== bookletCount && paperCount > 0 && bookletCount > 0) {
            mismatchContent.classList.remove('hidden');
        } else {
            mismatchContent.classList.add('hidden');
        }
    }
    
    if (paperFormCountField && familyBookletCountField) {
        paperFormCountField.addEventListener('input', checkCountMismatch);
        familyBookletCountField.addEventListener('input', checkCountMismatch);
    }
}

function initializeFamilyMembersStep() {
    // This will be called when the immediate family names recording modal is shown
    // It can be expanded to dynamically add family member confirmation questions
}

function addFamilyMember() {
    const container = document.getElementById('family-members-container');
    const memberIndex = container.children.length + 1;
    
    const memberDiv = document.createElement('div');
    memberDiv.className = 'form-group';
    memberDiv.innerHTML = `
        <label>Did the interviewee confirm the name of family member ${memberIndex}?</label>
        <div class="toggle-group">
            <button class="toggle-option" data-value="yes">Yes</button>
            <button class="toggle-option" data-value="no">No</button>
        </div>
        <input type="text" class="input-field" placeholder="Enter family member name...">
    `;
    
    container.appendChild(memberDiv);
    
    // Initialize the new toggle group
    initializeToggleGroups();
}

// Utility functions
function getCameraSVG() {
    return `<svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="21.3047" cy="21" r="20" stroke="#0181A1" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3047 25C20.7113 25 20.1313 24.8241 19.638 24.4944C19.1446 24.1648 18.7601 23.6962 18.533 23.1481C18.306 22.5999 18.2466 21.9967 18.3623 21.4147C18.4781 20.8328 18.7638 20.2982 19.1834 19.8787C19.6029 19.4591 20.1375 19.1734 20.7194 19.0576C21.3014 18.9419 21.9046 19.0013 22.4527 19.2284C23.0009 19.4554 23.4695 19.8399 23.7991 20.3333C24.1287 20.8266 24.3047 21.4067 24.3047 22C24.3047 22.7956 23.9886 23.5587 23.426 24.1213C22.8634 24.6839 22.1003 25 21.3047 25ZM21.3047 17C20.3158 17 19.3491 17.2932 18.5268 17.8427C17.7046 18.3921 17.0637 19.173 16.6853 20.0866C16.3069 21.0002 16.2078 22.0055 16.4008 22.9755C16.5937 23.9454 17.0699 24.8363 17.7692 25.5355C18.4684 26.2348 19.3593 26.711 20.3292 26.9039C21.2991 27.0969 22.3045 26.9978 23.2181 26.6194C24.1317 26.241 24.9126 25.6001 25.462 24.7779C26.0114 23.9556 26.3047 22.9889 26.3047 22C26.3047 20.6739 25.7779 19.4021 24.8402 18.4645C23.9025 17.5268 22.6308 17 21.3047 17ZM13.3047 28V17H17.8347L19.8347 14H22.7747L24.7747 17H29.3047V28H13.3047ZM29.3047 15H25.8347L24.4347 12.89C24.2524 12.6167 24.0055 12.3926 23.716 12.2374C23.4265 12.0821 23.1032 12.0006 22.7747 12H19.8347C19.5062 12.0006 19.1829 12.0821 18.8934 12.2374C18.6038 12.3926 18.357 12.6167 18.1747 12.89L16.7747 15H13.3047C12.7743 15 12.2655 15.2107 11.8905 15.5858C11.5154 15.9609 11.3047 16.4696 11.3047 17V28C11.3047 28.5304 11.5154 29.0391 11.8905 29.4142C12.2655 29.7893 12.7743 30 13.3047 30H29.3047C29.8351 30 30.3438 29.7893 30.7189 29.4142C31.094 29.0391 31.3047 28.5304 31.3047 28V17C31.3047 16.4696 31.094 15.9609 30.7189 15.5858C30.3438 15.2107 29.8351 15 29.3047 15Z" fill="#0181A1"/>
</svg>`;
}

function getMicSVG() {
    return `<svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="21.3047" cy="21" r="20" stroke="#0181A1" stroke-width="2"/>
<path d="M21.3047 25C22.4093 25 23.3047 24.1046 23.3047 23V15C23.3047 13.8954 22.4093 13 21.3047 13C20.2001 13 19.3047 13.8954 19.3047 15V23C19.3047 24.1046 20.2001 25 21.3047 25Z" fill="#0181A1"/>
<path d="M25.3047 20V23C25.3047 25.2091 23.5138 27 21.3047 27C19.0956 27 17.3047 25.2091 17.3047 23V20" stroke="#0181A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3047 27V30" stroke="#0181A1" stroke-width="1.5" stroke-linecap="round"/>
<path d="M18.3047 30H24.3047" stroke="#0181A1" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
}

function saveProgress() {
    // In a real app, this would save to localStorage or send to server
    console.log('Progress saved automatically');
}

// Auto-save functionality
setInterval(saveProgress, 5000); // Save every 5 seconds

// Handle device permissions (for real implementation)
// Note: Camera/microphone access requires HTTPS when not on localhost
function requestDevicePermissions() {
    // Camera permission
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                permissions.photos = true;
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(() => {
                permissions.photos = false;
                console.log('Camera access denied or not available (may require HTTPS)');
            });
    } else {
        console.log('Camera API not available');
    }
    
    // Microphone permission
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                permissions.audio = true;
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(() => {
                permissions.audio = false;
                console.log('Microphone access denied or not available (may require HTTPS)');
            });
    } else {
        console.log('Microphone API not available');
    }
    
    // Location permission
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            () => {
                permissions.location = true;
            },
            () => {
                permissions.location = false;
                console.log('Location access denied or not available');
            }
        );
    } else {
        console.log('Geolocation API not available');
    }
}

// Service Worker registration for PWA functionality
// Note: Service Workers require HTTPS, so this won't work when opening files directly
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} else {
    console.log('Service Worker not available (requires HTTPS) - app will still work as a regular web page');
}

// Initialize field interviews with 10 blank interviews
function initializeFieldInterviews() {
    if (fieldInterviews.length === 0) {
        for (let i = 0; i < 10; i++) {
            const interviewId = generateInterviewId(i + 1);
            const newInterview = {
                id: `field_${Date.now() + i}`,
                completed: false,
                steps: 6,
                filledSteps: 0,
                intervieweeName: `Interviewee ${i + 1}`,
                interviewId: interviewId,
                metInPerson: null,
                recordings: {
                    'sound-check': { completed: false, optional: true },
                    'names-from-last-page': { completed: false, optional: false },
                    'names-from-random-page': { completed: false, optional: false },
                    'immediate-family-names': { completed: false, optional: false }
                }
            };
            fieldInterviews.push(newInterview);
        }
    }
}

// Generate interview ID in the format shown in the screenshot
function generateInterviewId(index) {
    const baseId = 'GH55_001_20201225_';
    const paddedIndex = String(1110 + index).padStart(4, '0');
    return baseId + paddedIndex;
}

// Initialize field interviews on first load
initializeFieldInterviews();

// Summary Screen Functions
function showSummaryScreen() {
    showScreen('summary-screen');
    
    // Set up event listeners
    const backBtn = document.getElementById('back-to-work-order-from-summary');
    const finishBtn = document.getElementById('finish-summary');
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showScreen('work-order-screen');
        });
    }
    
    if (finishBtn) {
        finishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            finishSummary();
        });
    }
}

function finishSummary() {
    const summaryText = document.getElementById('audit-summary').value.trim();
    const initials = document.getElementById('auditor-initials').value.trim();
    
    if (!summaryText) {
        showModal('Missing Information', 'Please enter a summary of the audit.');
        return;
    }
    
    if (!initials) {
        showModal('Missing Information', 'Please enter your initials as your signature.');  
        return;
    }
    
    // Store the summary data
    if (typeof auditData === 'undefined') {
        window.auditData = {};
    }
    auditData.summary = {
        text: summaryText,
        initials: initials,
        timestamp: new Date().toISOString()
    };
    
    // Mark summary task as complete in the task list
    const summaryTask = document.querySelector('[data-task="summary"]');
    if (summaryTask) {
        const progressCircle = summaryTask.querySelector('.progress-circle');
        const progressSpan = progressCircle.querySelector('span');
        
        progressSpan.textContent = 'Done';
        progressCircle.classList.remove('partial');
        progressCircle.classList.add('completed');
    }
    
    // Save to local storage
    try {
        localStorage.setItem('auditData', JSON.stringify(auditData));
    } catch (e) {
        console.log('Could not save to localStorage:', e);
    }
    
    // Go directly back to work order screen
    showScreen('work-order-screen');
}
