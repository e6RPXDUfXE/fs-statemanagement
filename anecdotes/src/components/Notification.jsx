import { useNotification } from '../notificationStore'
const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  const message = useNotification()
  if (!message) {
    return null
  }
  
  return (
    <div style={style} data-testid="notification">
      {message}
    </div>
  )
}

export default Notification
