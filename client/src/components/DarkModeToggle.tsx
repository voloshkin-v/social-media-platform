import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{theme === 'dark' ? <Sun /> : <Moon />}
		</Button>
	);
};

export default DarkModeToggle;
