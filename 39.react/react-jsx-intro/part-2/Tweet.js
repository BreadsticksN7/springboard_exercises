const Tweet = (props) => {
  return (
    <div>
      <span><b>Username: </b>{props.username} </span>
      <span><b>Time: </b>{props.time} </span>
      <p><b>Message: </b>{props.message}</p>
    </div>
  )
}