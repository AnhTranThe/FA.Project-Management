import serviceClientNavigations from "./serviceClientNavigations";

export default function allClientNavigations(id: string) {
  return [...serviceClientNavigations(id)];
}
