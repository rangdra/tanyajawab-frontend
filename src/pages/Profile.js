import Layout from '../components/Layout';
import PostItem from '../components/PostItem';
import { useGlobalContext } from '../context/GlobalContext';

const Profile = () => {
  const {
    authState: { user },
  } = useGlobalContext();

  console.log(user);

  return (
    <Layout title={`${user?.username} Profile`}>
      <div className="row">
        <div className="mb-3 col-sm-3 col-md-4">
          <div className="card w-100">
            <img
              src={user?.photo}
              className="p-5 card-img-top rounded-circle"
              alt={user?.username}
            />
            <div className="card-body">
              <h5 className="card-title">{user?.fullname}</h5>
              <h6 class="card-subtitle mb-2 text-muted">@{user?.username}</h6>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email: {user?.email}</li>
              <li className="list-group-item">
                Profesi: {user?.profesi || '-'}
              </li>
            </ul>
            <div className="card-body">
              <button className="btn btn-primary w-100">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="col-sm-9 col-md-8">
          <div>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  My Posts
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {user?.posts?.length > 0 ? (
                  user?.posts?.map((post) => (
                    <PostItem post={post} key={post.id} />
                  ))
                ) : (
                  <p>Post kosong</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
