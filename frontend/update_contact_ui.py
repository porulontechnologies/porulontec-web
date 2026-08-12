import os
import re

file_path = 'src/pages/Contact.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def inject_error(field_name, content):
    # Find the input/textarea and inject error below it
    # We will look for name="field_name" and inject right after its closing tag or />
    pattern = r'(name="' + field_name + r'".*?/>)'
    if field_name == 'message':
        pattern = r'(name="message".*?/>)'
    
    # Actually it's easier to find the input tag block.
    # The inputs end with placeholder="..." /> or similar.
    # We'll just replace the specific class to conditionally add red border, and add the error message
    pass

# We will just replace the class string to include the error logic and add the p tag
replacements = {
    'name="firstName"': ('firstName', 'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}'),
    'name="lastName"': ('lastName', 'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}'),
    'name="email"\n                      type="email"': ('email', 'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}'),
    'name="subject"': ('subject', 'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}'),
}

for name_attr, (field, new_class) in replacements.items():
    if name_attr in content:
        # Replace the class name
        content = re.sub(
            name_attr + r'(.*?)className=".*?"',
            name_attr + r'\1' + new_class,
            content,
            flags=re.DOTALL | re.MULTILINE
        )
        # Add error message below the input
        # Find where the placeholder ends
        content = re.sub(
            r'(' + name_attr + r'.*?placeholder=".*?"\s*/>)',
            r'\1\n                      {errors.' + field + r' && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.' + field + r'}</p>}',
            content,
            flags=re.DOTALL
        )

# For textarea message
content = re.sub(
    r'name="message"(.*?)className=".*?"',
    r'name="message"\1' + 'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all resize-none font-medium}',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'(name="message".*?placeholder=".*?"\s*/>)',
    r'\1\n                  {errors.message && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.message}</p>}',
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Contact.jsx UI updated.')
