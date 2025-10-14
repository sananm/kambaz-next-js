export default function ConditionalOutputIfElse() {
  const loggedIn = true;
  if (loggedIn) {
    return (
      <div>
        <h2>Generating Conditional Output</h2>
        <h3 id='wd-conditional-output-if-else-welcome'>Welcome If Else</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Generating Conditional Output</h2>
        <h3 id='wd-conditional-output-if-else-login'>Please login If Else</h3>
      </div>
    );
  }
}
