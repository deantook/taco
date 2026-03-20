import { useCallback, useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ApiError } from '../../api/client'
import * as creditApi from '../../api/credit'
import * as personApi from '../../api/person'
import * as roleApi from '../../api/role'
import type { CreditContentType } from '../../constants/credits'
import { parseOptionalJson } from '../../lib/json'
import { parseIntOptional } from '../../lib/number'
import type { Credit, Person, Role } from '../../types/api'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'

type CreditsEditorProps = {
  contentType: CreditContentType
  /** 已保存的作品 ID；新建作品时为 null */
  contentId: number | null
}

export function CreditsEditor({ contentType, contentId }: CreditsEditorProps) {
  const [credits, setCredits] = useState<Credit[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [persons, setPersons] = useState<Person[]>([])
  const [personNames, setPersonNames] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [personIdStr, setPersonIdStr] = useState('')
  const [roleIdStr, setRoleIdStr] = useState('')
  const [subRole, setSubRole] = useState('')
  const [characterName, setCharacterName] = useState('')
  const [orderStr, setOrderStr] = useState('')
  const [extraText, setExtraText] = useState('')
  const [saving, setSaving] = useState(false)
  const [formErr, setFormErr] = useState<string | null>(null)

  const loadCredits = useCallback(async () => {
    if (contentId == null) {
      return
    }
    setLoading(true)
    setErr(null)
    try {
      const list = await creditApi.fetchCreditsByContent(contentType, contentId)
      setCredits(list)
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : '演职列表加载失败')
      setCredits([])
    } finally {
      setLoading(false)
    }
  }, [contentType, contentId])

  useEffect(() => {
    if (contentId == null) {
      setCredits([])
      return
    }
    void loadCredits()
  }, [contentId, loadCredits])

  useEffect(() => {
    let cancelled = false
    roleApi
      .fetchRoleList()
      .then((r) => {
        if (!cancelled) {
          setRoles(r)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRoles([])
        }
      })
    personApi
      .fetchPersonPage(1, 100)
      .then((p) => {
        if (!cancelled) {
          setPersons(p.records)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPersons([])
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const ids = [
      ...new Set(
        credits
          .map((c) => c.personId)
          .filter((x): x is number => x != null)
      ),
    ]
    if (ids.length === 0) {
      return
    }
    let cancelled = false
    void (async () => {
      const next: Record<number, string> = {}
      await Promise.all(
        ids.map(async (id) => {
          try {
            const p = await personApi.getPerson(id)
            next[id] = p.name ?? `#${id}`
          } catch {
            next[id] = `#${id}`
          }
        })
      )
      if (!cancelled) {
        setPersonNames((prev) => ({ ...prev, ...next }))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [credits])

  function resetCreditForm() {
    setEditingId(null)
    setPersonIdStr('')
    setRoleIdStr('')
    setSubRole('')
    setCharacterName('')
    setOrderStr('')
    setExtraText('')
    setFormErr(null)
  }

  function fillForm(c: Credit) {
    setEditingId(c.id ?? null)
    setPersonIdStr(c.personId != null ? String(c.personId) : '')
    setRoleIdStr(c.roleId != null ? String(c.roleId) : '')
    setSubRole(c.subRole ?? '')
    setCharacterName(c.characterName ?? '')
    setOrderStr(c.order != null ? String(c.order) : '')
    setExtraText(
      c.extra != null ? JSON.stringify(c.extra, null, 2) : ''
    )
    setFormErr(null)
  }

  async function handleSaveCredit(e: React.FormEvent) {
    e.preventDefault()
    if (contentId == null) {
      return
    }
    const personId = parseIntOptional(personIdStr)
    const roleId = parseIntOptional(roleIdStr)
    if (personId == null) {
      setFormErr('请选择人物')
      return
    }
    if (roleId == null) {
      setFormErr('请选择角色类型')
      return
    }
    let extra: unknown = null
    try {
      if (extraText.trim()) {
        extra = parseOptionalJson(extraText)
      }
    } catch {
      setFormErr('扩展信息（JSON）格式不正确')
      return
    }

    const body: Partial<Credit> = {
      contentType,
      contentId,
      personId,
      roleId,
      subRole: subRole.trim() || null,
      characterName: characterName.trim() || null,
      order: parseIntOptional(orderStr),
      extra,
    }

    setSaving(true)
    setFormErr(null)
    try {
      if (editingId != null) {
        body.id = editingId
        await creditApi.updateCredit(editingId, body)
      } else {
        await creditApi.createCredit(body)
      }
      resetCreditForm()
      await loadCredits()
    } catch (ex) {
      setFormErr(ex instanceof ApiError ? ex.message : '保存失败')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteCredit(id: number) {
    if (!window.confirm('确定删除该演职关系？')) {
      return
    }
    try {
      await creditApi.deleteCredit(id)
      if (editingId === id) {
        resetCreditForm()
      }
      await loadCredits()
    } catch (e) {
      window.alert(e instanceof ApiError ? e.message : '删除失败')
    }
  }

  if (contentId == null) {
    return (
      <p className="mt-4 border-t border-black/8 pt-4 text-xs text-neutral-500 dark:border-white/10 dark:text-neutral-400">
        请先保存作品，再通过编辑添加演职人员。
      </p>
    )
  }

  return (
    <div className="mt-4 border-t border-black/8 pt-4 dark:border-white/10">
      <h3 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
        演职人员
      </h3>
      {err ? (
        <p className="mb-2 text-sm text-red-600 dark:text-red-400">{err}</p>
      ) : null}

      <div className="mb-4 max-h-48 overflow-auto rounded-[var(--radius-panel)] border border-black/8 dark:border-white/10">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-black/8 bg-neutral-50/80 dark:border-white/10 dark:bg-white/5">
              <th className="px-2 py-2 font-medium text-neutral-600 dark:text-neutral-400">
                人物
              </th>
              <th className="px-2 py-2 font-medium text-neutral-600 dark:text-neutral-400">
                职业
              </th>
              <th className="hidden px-2 py-2 font-medium text-neutral-600 sm:table-cell dark:text-neutral-400">
                细分
              </th>
              <th className="hidden px-2 py-2 font-medium text-neutral-600 md:table-cell dark:text-neutral-400">
                饰演
              </th>
              <th className="px-2 py-2 font-medium text-neutral-600 dark:text-neutral-400">
                序
              </th>
              <th className="w-20 px-2 py-2 text-right dark:text-neutral-400">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-2 py-4 text-center text-neutral-500">
                  加载中…
                </td>
              </tr>
            ) : !credits.length ? (
              <tr>
                <td colSpan={6} className="px-2 py-4 text-center text-neutral-500">
                  暂无演职，请在下方添加
                </td>
              </tr>
            ) : (
              credits.map((c) => {
                const pid = c.personId ?? 0
                const pname =
                  personNames[pid] ?? (c.personId != null ? `#${c.personId}` : '—')
                const r = roles.find((x) => x.id === c.roleId)
                const rname = r?.name ?? (c.roleId != null ? `#${c.roleId}` : '—')
                return (
                  <tr
                    key={c.id != null ? String(c.id) : `tmp-${pid}-${c.roleId}`}
                    className="border-b border-black/6 last:border-0 dark:border-white/6"
                  >
                    <td className="max-w-[100px] truncate px-2 py-1.5">{pname}</td>
                    <td className="max-w-[80px] truncate px-2 py-1.5">{rname}</td>
                    <td className="hidden max-w-[80px] truncate px-2 py-1.5 sm:table-cell">
                      {c.subRole ?? '—'}
                    </td>
                    <td className="hidden max-w-[80px] truncate px-2 py-1.5 md:table-cell">
                      {c.characterName ?? '—'}
                    </td>
                    <td className="px-2 py-1.5">{c.order ?? '—'}</td>
                    <td className="px-2 py-1.5 text-right">
                      <div className="flex justify-end gap-0.5">
                        <Button
                          type="button"
                          variant="ghost"
                          className="size-7 p-0"
                          onClick={() => fillForm(c)}
                          aria-label="编辑"
                        >
                          <Pencil className="size-3.5" strokeWidth={1.75} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="size-7 p-0 text-red-600 dark:text-red-400"
                          onClick={() => c.id != null && handleDeleteCredit(c.id)}
                          disabled={c.id == null}
                          aria-label="删除"
                        >
                          <Trash2 className="size-3.5" strokeWidth={1.75} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSaveCredit} className="flex flex-col gap-2 rounded-[var(--radius-panel)] border border-dashed border-black/15 bg-neutral-50/50 p-3 dark:border-white/15 dark:bg-white/5">
        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {editingId != null ? '编辑演职关系' : '添加演职关系'}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="mb-0.5 block text-[10px] text-neutral-500">人物</label>
            <select
              value={personIdStr}
              onChange={(e) => setPersonIdStr(e.target.value)}
              className="w-full rounded-[var(--radius-panel)] border border-black/8 bg-white px-2 py-1.5 text-xs dark:border-white/10 dark:bg-neutral-950"
              required
            >
              <option value="">请选择</option>
              {persons.map((p) => (
                <option key={String(p.id)} value={p.id != null ? String(p.id) : ''}>
                  {p.name ?? '未命名'} ({p.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-0.5 block text-[10px] text-neutral-500">
              职业（角色类型）
            </label>
            <select
              value={roleIdStr}
              onChange={(e) => setRoleIdStr(e.target.value)}
              className="w-full rounded-[var(--radius-panel)] border border-black/8 bg-white px-2 py-1.5 text-xs dark:border-white/10 dark:bg-neutral-950"
              required
            >
              <option value="">请选择</option>
              {roles.map((r) => (
                <option key={String(r.id)} value={r.id != null ? String(r.id) : ''}>
                  {r.name ?? r.code ?? `#${r.id}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="mb-0.5 block text-[10px] text-neutral-500">
              细分（如主演）
            </label>
            <Input
              value={subRole}
              onChange={(e) => setSubRole(e.target.value)}
              className="text-xs py-1.5"
            />
          </div>
          <div>
            <label className="mb-0.5 block text-[10px] text-neutral-500">饰演角色名</label>
            <Input
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="text-xs py-1.5"
            />
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="mb-0.5 block text-[10px] text-neutral-500">排序</label>
            <Input
              inputMode="numeric"
              value={orderStr}
              onChange={(e) => setOrderStr(e.target.value)}
              placeholder="越小越靠前"
              className="text-xs py-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-0.5 block text-[10px] text-neutral-500">
              扩展（JSON，可选）
            </label>
            <Textarea
              value={extraText}
              onChange={(e) => setExtraText(e.target.value)}
              rows={2}
              className="text-xs"
            />
          </div>
        </div>
        {formErr ? (
          <p className="text-xs text-red-600 dark:text-red-400">{formErr}</p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary" className="text-xs py-1.5" disabled={saving}>
            {saving ? '保存中…' : editingId != null ? '更新关系' : '添加'}
          </Button>
          {editingId != null ? (
            <Button
              type="button"
              variant="secondary"
              className="text-xs py-1.5"
              onClick={resetCreditForm}
            >
              取消编辑
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  )
}
