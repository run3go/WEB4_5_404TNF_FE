import { redirect } from 'next/navigation';

export default function AdminPage() {
  // 주석
  redirect('/admin/user?page=1');
}
