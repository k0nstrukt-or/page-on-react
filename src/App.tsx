import './App.scss';
import { NewUser } from './components/NewUser/NewUser';
import { Header } from './components/Header/Header';
import { TitleSection } from './components/TitleSection/TitleSection';
import { UserList } from './components/UserList.tsx/UserList';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsersPagination } from './api';

function App() {
  const [count, setCount] = useState(6);
  const [users, setUsers] = useState<User[]>([]);
  const [total_users, setTotalUsers] = useState(0);
  const [isLoaded, setLoaded] = useState(false);

  const displayUsers = useCallback((count: number) => {
    getUsersPagination(count).then(data => 
      {
        setTotalUsers(data.total_users)
        
        setUsers(data.users.sort((user1, user2) => (
        user2.registration_timestamp - user1.registration_timestamp
        )))
      }
    ).finally(() => setLoaded(true));
  }, [])

  useEffect(() => {
    displayUsers(count);
  }, [count, displayUsers])

  const increaseCount = useCallback(() => {
    setCount(count => count + 6)
  }, []);
  
  const isButtonVisible = total_users > count;

  return (
    <>
      <Header />

      <main className="App__main">
        <div className="HeroSectionContainer">
          <TitleSection />
        </div>
       
        <div className="ContentContainer">
          <div className="UserListContainer">
            <UserList 
              increaseCount={increaseCount}
              users={users}
              isLoaded={isLoaded}
              isButtonVisible={isButtonVisible}
            />
          </div>
          
          <div className="NewUserContainer">
            <NewUser displayUsers={displayUsers} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
