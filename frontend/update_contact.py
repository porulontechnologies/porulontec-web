import os
import re

file_path = 'src/pages/Contact.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add errors state
if 'const [errors, setErrors] = useState({});' not in content:
    content = content.replace(
        "const [status, setStatus] = useState('idle');",
        "const [errors, setErrors] = useState({});\n  const [status, setStatus] = useState('idle');"
    )

# Update handleChange to clear error
handle_change_old = '''  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };'''
handle_change_new = '''  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };'''
content = content.replace(handle_change_old, handle_change_new)

# Add validateForm and update handleSubmit
handle_submit_old = '''  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');'''

handle_submit_new = '''  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('submitting');'''
content = content.replace(handle_submit_old, handle_submit_new)

# handle error setting on catch block
catch_old = '''    } catch (err) {
      console.error(err);
      setStatus('sent');
    }'''
catch_new = '''    } catch (err) {
      console.error(err);
      setErrors({ form: 'An error occurred. Please try again.' });
      setStatus('idle');
    }'''
content = content.replace(catch_old, catch_new)

# update form rendering
# form element
form_start_old = '''              <form
                onSubmit={handleSubmit}
                className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/70 backdrop-blur-xl shadow-xl space-y-4"
                data-aos="fade-left"
              >'''
form_start_new = form_start_old + '''\n                {errors.form && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl text-center">
                    {errors.form}
                  </div>
                )}'''
content = content.replace(form_start_old, form_start_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Contact.jsx logic updated.')
