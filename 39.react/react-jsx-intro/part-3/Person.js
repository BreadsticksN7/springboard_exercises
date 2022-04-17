const Person = (props) => {
  let hobbies = props.hobbies.map(h => (<li><b>{h}</b></li>))
  let vote;
  if (props.age < 18) {
    vote = <h3>"You must be over 18 to vote"</h3>
  } else {
    vote = <h3>"Please go vote!"</h3>
  }

  return (
    <div>
        <p>Learn some information about this person:</p>
        <ul>
          <li>Name:{props.username.slice(0,6)}</li>
        <li>Age:{props.age}</li>
        <li>Status:{vote}</li>
        <ul>Hobbies:{hobbies}</ul>
        </ul>
    </div>
  );
};