- stick to the next.js and react.js defaukts
- add less additional librarys as possible
- use Tailwind CSS, DaisyUI for the frontend
- keep the code as simple as possible
- write clean human readable code
- refactor functions when possible to reduce redundant code

## Additional Development Information

### Code Structure
- **App Router**: This project uses Next.js App Router (not Pages Router)
- **Client Components**: Components that need interactivity should use the `"use client"` directive
- **Server Components**: By default, components are server components unless marked with `"use client"`

### State Management
- Use React's built-in state management (useState, useContext) for simple state
- For more complex state, consider using React Context API before adding external libraries

### API Integration
- The current implementation has a placeholder for API calls in the Home component
- When implementing actual API calls:
	- Create API handlers in the `app/api` directory
	- Use the fetch API for client-side requests
	- Consider using React Query for more complex data fetching scenarios

### CSS Guidelines
- Use Tailwind CSS utility classes for styling
- Use DaisyUI components when appropriate
- Avoid custom CSS unless absolutely necessary
- Follow the BEM naming convention for any custom CSS classes

### Performance Considerations
- Use Next.js Image component for optimized images
- Implement code splitting where appropriate
- Use React.memo for expensive components that re-render often
- Implement proper loading states for async operations

### Accessibility
- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Include proper ARIA attributes where needed
- Maintain sufficient color contrast ratios

### Error Handling
- Implement proper error boundaries
- Use try/catch blocks for async operations
- Provide meaningful error messages to users
- Log errors for debugging purposes
