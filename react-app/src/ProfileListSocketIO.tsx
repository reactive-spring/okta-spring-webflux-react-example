import * as React from 'react';
import { Auth } from './App';
import { subscribeToProfiles } from './socketio-client';

interface Profile {
  id: number;
  email: string;
}

interface ProfileListProps {
  auth: Auth;
}

interface ProfileListState {
  profiles: Array<Profile>;
  isLoading: boolean;
}

class ProfileListSocketIO extends React.Component<ProfileListProps, ProfileListState> {

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const response = await fetch('http://localhost:8080/profiles', {
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    });
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});

    subscribeToProfiles((error: string, profile: Profile) => {
      console.log('got profile', profile);
      this.state.profiles.push(profile);
    });
  }

  render() {
    const {profiles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Profile List</h2>
        {profiles.map((profile: Profile) =>
          <div key={profile.id}>
            {profile.email}<br/>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileListSocketIO;