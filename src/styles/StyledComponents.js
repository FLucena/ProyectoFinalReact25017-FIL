import styled from 'styled-components';
import theme from './GlobalStyles';

// Componentes de Layout
export const Container = styled.div`
  padding-left: ${theme.spacing.md};
  padding-right: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  @media (min-width: ${theme.breakpoints.xl}) {
    max-width: 1140px;
    margin: 0 auto;
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding-top: 8rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-top: 6rem;
  }
`;

// Componentes de Botones
export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  min-height: 44px;
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  
  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0.5rem 1.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0.75rem 2rem;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  
  &:hover:not(:disabled) {
    background-color: #0a58ca;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  
  &:hover:not(:disabled) {
    background-color: #5a6268;
    transform: translateY(-1px);
  }
`;

export const OutlineButton = styled(Button)`
  background-color: transparent;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-1px);
  }
`;

// Componentes de Tarjetas
export const Card = styled.div`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:focus-within {
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.lg};
    }
  }
`;

export const GameCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

// Componentes de Formularios
export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  min-height: 44px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
  
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  min-height: 44px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
`;

export const FloatingLabel = styled.label`
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  background-color: ${theme.colors.white};
  padding: 0 0.25rem;
  
  ${Input}:focus ~ &,
  ${Input}:not(:placeholder-shown) ~ &,
  ${Select}:focus ~ &,
  ${Select}:not([value=""]) ~ & {
    top: 0.25rem;
    left: 0.75rem;
    font-size: 0.75rem;
    color: ${theme.colors.primary};
  }
`;

// Componentes de Insignias
export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 1rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
`;

export const PrimaryBadge = styled(Badge)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;

export const SuccessBadge = styled(Badge)`
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
`;

export const WarningBadge = styled(Badge)`
  background-color: ${theme.colors.warning};
  color: ${theme.colors.dark};
`;

export const DangerBadge = styled(Badge)`
  background-color: ${theme.colors.danger};
  color: ${theme.colors.white};
`;

// Componentes de Alertas
export const Alert = styled.div`
  padding: ${theme.spacing.md};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
`;

export const AlertInfo = styled(Alert)`
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
`;

export const AlertWarning = styled(Alert)`
  background-color: #fff3cd;
  border-color: #ffeaa7;
  color: #856404;
`;

export const AlertDanger = styled(Alert)`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
`;

// Componentes de Modales
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
`;

export const ModalContent = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 500px;
  }
`;

export const ModalHeader = styled.div`
  background-color: ${theme.colors.gray[100]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  padding: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 1.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 2rem;
  }
`;

// Componentes de Carga y Estados
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl};
  
  &::after {
    content: '';
    width: 2rem;
    height: 2rem;
    border: 3px solid ${theme.colors.gray[300]};
    border-top: 3px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  color: ${theme.colors.gray[600]};
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: ${theme.borderRadius.md};
  color: #721c24;
`;

// Componentes de Utilidad
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.gap || theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: ${props => props.mobileStack ? 'column' : 'row'};
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '250px'}, 1fr));
  gap: ${props => props.gap || theme.spacing.md};
`;

export const Separator = styled.hr`
  border: none;
  height: 1px;
  background-color: ${theme.colors.gray[300]};
  margin: ${theme.spacing.md} 0;
`;

// Utilidades responsivas
export const ResponsiveText = styled.p`
  font-size: ${props => props.size || '1rem'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${props => props.mobileSize || props.size || '0.875rem'};
  }
`;

export const ResponsiveHeading = styled.h1`
  font-size: ${props => props.size || '2rem'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${props => props.mobileSize || '1.5rem'};
  }
`; 