export default function({redirect}) {

  if(localStorage.getItem('is_authenticated') === null || localStorage.getItem('auth_token') === null || localStorage.getItem('user_data') === null) {
    redirect('/login');
  }
}
