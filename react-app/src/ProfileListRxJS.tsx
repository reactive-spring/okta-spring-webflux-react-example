import * as React from 'react';
import { Auth } from './App';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
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

class ProfileListRxJS extends React.Component<ProfileListProps, ProfileListState> {

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const authHeader = {
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    };

    const request = interval(3000).pipe(
      startWith(0),
      switchMap(() =>
        fetch('http://localhost:8080/profiles', authHeader)
          .then((response) => response.json())
    ));

    request.subscribe(data => {
      this.setState({profiles: data, isLoading: false});
    })
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

export default withAuth(ProfileListRxJS);