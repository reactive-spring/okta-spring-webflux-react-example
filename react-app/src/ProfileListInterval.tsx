import * as React from 'react';
import { Auth } from './App';
import { withAuth } from '@okta/okta-react';

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

class ProfileListInterval extends React.Component<ProfileListProps, ProfileListState> {
  private interval: any;

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async fetchData() {
    this.setState({isLoading: true});

    const response = await fetch('http://localhost:8080/profiles', {
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    });
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});
  }

  async componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

export default withAuth(ProfileListInterval);