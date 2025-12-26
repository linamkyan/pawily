import React, { useState, useEffect } from 'react';
import { Input, FilledBtn, SocialButton } from '../../UI/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, clearError } from '../../store/slices/authSlice';
import styles from './LoginForm.module.scss';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  theme: 'light' | 'dark';
  onSwitchToRegister?: () => void;
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

export const LoginForm: React.FC<LoginFormProps> = ({ theme, onSwitchToRegister }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await dispatch(login({
      username: formData.email,
      password: formData.password
    }));
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
        <h2 className={styles.formTitle}>Log in to Pawily</h2>
        <p className={styles.formSubtitle}>
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
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

        <div className={styles.forgotPassword}>
          <Link theme={theme} variant="secondary" onClick={() => console.log('Forgot password')}>
            Forgot password?
          </Link>
        </div>

        <FilledBtn
          label={isLoading ? "Signing in..." : "Sign in"}
          theme={theme}
          disabled={isLoading}
          onClick={() => {}}
          type="submit"
        />

        <div className={styles.registerPrompt}>
          <span className={styles.promptText}>Don't have an account?</span>
          <Link theme={theme} onClick={onSwitchToRegister}>
            Sign up
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