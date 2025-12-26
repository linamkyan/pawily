import React, { useState, useEffect } from 'react';
import { Input, FilledBtn, SocialButton } from '../../UI/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, login, clearError } from '../../store/slices/authSlice';
import styles from './RegistrationForm.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegistrationFormProps {
  theme: 'light' | 'dark';
  onSwitchToLogin?: () => void;
}

const Link: React.FC<{
  children: React.ReactNode;
  theme: 'light' | 'dark';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}> = ({ children, theme, variant = 'primary', onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`${styles.link} ${styles[theme]} ${styles[variant]}`}
    >
      {children}
    </a>
  );
};

const Divider: React.FC<{
  text?: string;
  theme: 'light' | 'dark';
}> = ({ text, theme }) => {
  return (
    <div className={`${styles.divider} ${styles[theme]}`}>
      <div className={styles.dividerLine} />
      {text && <span className={styles.dividerText}>{text}</span>}
      <div className={styles.dividerLine} />
    </div>
  );
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ theme, onSwitchToLogin }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const registerResult = await dispatch(register({
      username: formData.email,
      email: formData.email,
      password: formData.password,
    }));

    if (register.fulfilled.match(registerResult)) {
      await dispatch(login({
        username: formData.email,
        password: formData.password,
      }));
    }
  };
  
  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className={`${styles.formContainer} ${styles[theme]}`}>
      <div className={styles.logo}>Logo</div>

      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create a new account</h2>
        <p className={styles.formSubtitle}>
          Lorem ipsum dolor sit amet consectetur. Donec platea facilisis vestibulum
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameFields}>
          <Input
            label="First Name"
            placeholder="eg.John"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            error={errors.firstName}
            theme={theme}
            name="firstName"
          />
          <Input
            label="Last Name"
            placeholder="eg.Doe"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            error={errors.lastName}
            theme={theme}
            name="lastName"
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="eg.johndoe@gmail.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          theme={theme}
          name="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          theme={theme}
          name="password"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={errors.confirmPassword}
          theme={theme}
          name="confirmPassword"
        />

        <FilledBtn 
          label={isLoading ? "Creating account..." : "Sign up"}
          theme={theme}
          disabled={isLoading}
          onClick={() => {}}
          type="submit"
        />

        <div className={styles.loginPrompt}>
          <span className={styles.promptText}>Already have an account?</span>
          <Link theme={theme} onClick={onSwitchToLogin}>
            Sign in
          </Link>
        </div>

        <div className={styles.terms}>
          <span className={styles.termsText}>By continuing you agree to our</span>
          <Link theme={theme} variant="secondary" onClick={() => console.log('Terms')}>
            Terms and Conditions.
          </Link>
        </div>

        <Divider text="Or" theme={theme} />

        <div className={styles.socialButtons}>
          <SocialButton 
            provider="google"
            onClick={() => handleSocialLogin('google')}
            theme={theme}
          />
          <SocialButton 
            provider="apple"
            onClick={() => handleSocialLogin('apple')}
            theme={theme}
          />
        </div>
      </form>
    </div>
  );
};