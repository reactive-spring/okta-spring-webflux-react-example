import * as React from 'react';
import { Auth } from './App';
import { withAuth } from '@okta/okta-react';
import EventSource from 'event-source'

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

class ProfileListEventSource extends React.Component<ProfileListProps, ProfileListState> {

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async fetchData(accessToken: string) {
    this.setState({isLoading: true});
    const response = await fetch('http://localhost:8080/profiles', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});
  }

  async componentDidMount() {
    const accessToken = await this.props.auth.getAccessToken();
    this.fetchData(accessToken);
    const eventSource = new EventSource('http://localhost:8080/sse/profiles', {
      headers: { Authorization: accessToken }
    });
    eventSource.onopen = (event: any) => console.log('open', event);
    eventSource.onmessage = (event: any) => {
      const profile = JSON.parse(event.data).source;
      this.state.profiles.push(profile);
      this.setState({profiles: this.state.profiles});
    };
    eventSource.onerror = (event: any) => console.log('error', event);
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

export default withAuth(ProfileListEventSource);