import React from "react";
import { User } from "../../types/User";
import { Button } from "../Button/Button"
import { Loader } from '../Loader/Loader';
import { UserItem } from "../User/User";
import './UserList.scss'

type Props = {
  increaseCount: () => void;
  users: User[];
  isLoaded: boolean;
  isButtonVisible: boolean;
}

export const UserList:React.FC<Props> = React.memo(
  ({increaseCount, users, isLoaded, isButtonVisible
}) => {
  return (
    <section className="UserList" id="UserList">
      <h2 className="subtitle UserList__subtitle" >
        Working with GET request
      </h2>

      {isLoaded
       ? (
        <>
          <div className="UserList__container">
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          

          {isButtonVisible && (
            <div className="ButtonContainer">
              <Button
                width120px={true}
                clickHandler={increaseCount}
              >
                Show more
              </Button>
            </div>

          )}
        </>
       ) : (
        <Loader />
       )}
    </section>
  )}
)